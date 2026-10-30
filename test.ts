// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import type {Mapping} from 'clientnode'

import {timeout} from 'clientnode'
import {beforeEach, describe, expect, test} from '@jest/globals'

import {determineGlobalContext, errorHandler, globalContext} from './index'

describe('errorreporter', (): void => {
    // region mockup
    let fetchHandlerCalls: Array<Array<unknown>> = []
    let fetchResult: Promise<unknown> = Promise.resolve('dummyFetchResult')
    const fetch = ((...parameter: Array<unknown>): Promise<unknown> => {
        fetchHandlerCalls.push(parameter)

        return fetchResult
    }) as unknown as typeof globalContext.fetch

    let failedHandlerCall: Array<unknown> = []
    let reportedHandlerCall: Array<unknown> = []
    let issueToIgnoreHandlerCall: Array<unknown> = []

    const getLastBody = (): Mapping<unknown> => {
        const options =
            fetchHandlerCalls[fetchHandlerCalls.length - 1][1] as
                {body: string}

        return JSON.parse(options.body) as Mapping<unknown>
    }

    beforeEach((): void => {
        fetchHandlerCalls = []
        fetchResult = Promise.resolve('dummyFetchResult')
        globalContext.fetch = fetch

        failedHandlerCall = []
        errorHandler.failedHandler = (...parameter: Array<unknown>) => {
            failedHandlerCall = parameter
        }

        reportedHandlerCall = []
        errorHandler.reportedHandler = (...parameter: Array<unknown>) => {
            reportedHandlerCall = parameter
        }

        issueToIgnoreHandlerCall = []
        errorHandler.issueToIgnoreHandler = (
            ...parameter: Array<unknown>
        ) => {
            issueToIgnoreHandlerCall = parameter
        }

        errorHandler.issuesToIgnore = []
        errorHandler.additionalIssuesToIgnore = []
        errorHandler.location = {
            hostname: 'localhost',
            href: 'http://localhost',
            protocol: 'http:'
        }
        errorHandler.reported = {}
    })
    // endregion
    // region tests
    test('determineGlobalContext', (): void => {
        expect(determineGlobalContext()).toStrictEqual(globalThis)
    })

    test('errorHandler', async (): Promise<void> => {
        expect(errorHandler('')).toBeUndefined()
        expect(errorHandler('', '', 0, 0, {} as Error)).toBeUndefined()
        expect(failedHandlerCall).toHaveLength(0)
        expect(issueToIgnoreHandlerCall).toHaveLength(0)

        expect(fetchHandlerCalls).toHaveLength(2)
        expect(fetchHandlerCalls[0][0]).toStrictEqual(
            `http://localhost${errorHandler.reportPath}`
        )
        expect((fetchHandlerCalls[0][1] as Mapping<unknown>).method)
            .toStrictEqual('PUT')

        await timeout()

        expect(reportedHandlerCall[0]).toStrictEqual('dummyFetchResult')

        globalContext.fetch = null as unknown as typeof globalContext.fetch

        expect(errorHandler('a')).toBeUndefined()
        expect(failedHandlerCall[0]).toBeInstanceOf(Error)
    })

    test('errorHandler reports to configured port', (): void => {
        errorHandler.location = {
            hostname: 'example.com',
            href: 'https://example.com:8080/path',
            port: '8080',
            protocol: 'https:'
        }
        errorHandler.reportPath = '/report'

        errorHandler('a')

        expect(fetchHandlerCalls[0][0])
            .toStrictEqual('https://example.com:8080/report')
        expect(getLastBody().absoluteURL)
            .toStrictEqual('https://example.com:8080/path')

        errorHandler.reportPath = '/__error_report__'
    })

    test('errorHandler sends valid json', (): void => {
        const error = new Error('boom')
        const message = 'a "quoted"\tmessage\\ with\nnew\r\nlines\u0001'

        errorHandler(message, 'file.js', 2, 3, error)

        const body = getLastBody()

        expect(body.errorMessage)
            .toStrictEqual('a "quoted"\tmessage\\ with\nnew\nlines\u0001')
        expect(body.stack).toStrictEqual(error.stack?.replace(/\r\n?/g, '\n'))
        expect(body.url).toStrictEqual('file.js')
        expect(body.lineNumber).toStrictEqual(2)
        expect(body.columnNumber).toStrictEqual(3)
        expect(body.userAgent).toStrictEqual('unclear')

        errorHandler('b', 'file.js', NaN, Infinity)

        expect(getLastBody().lineNumber).toBeNull()
        expect(getLastBody().columnNumber).toBeNull()

        errorHandler('c')

        const minimalBody = getLastBody()

        expect(minimalBody.columnNumber).toBeNull()
        expect(minimalBody.lineNumber).toBeNull()
        expect(minimalBody.stack).toBeNull()
        expect(minimalBody.url).toBeNull()
    })

    test('errorHandler sends headers', (): void => {
        errorHandler('a')

        expect((fetchHandlerCalls[0][1] as Mapping<unknown>).headers)
            .toBeInstanceOf(Headers)

        const descriptor =
            Object.getOwnPropertyDescriptor(globalContext, 'Headers')
        delete (globalContext as Partial<typeof globalThis>).Headers

        try {
            errorHandler('b')

            expect((fetchHandlerCalls[1][1] as Mapping<unknown>).headers)
                .toStrictEqual({'Content-type': 'application/json'})
        } finally {
            if (descriptor)
                Object.defineProperty(globalContext, 'Headers', descriptor)
        }
    })

    test('errorHandler reports each error only once', (): void => {
        errorHandler('a', 'file.js', 1, 1)
        errorHandler('a', 'file.js', 1, 1)

        expect(fetchHandlerCalls).toHaveLength(1)

        errorHandler('a', 'file.js', 1, 2)
        errorHandler('b', 'file.js', 1, 1)

        expect(fetchHandlerCalls).toHaveLength(3)
    })

    test('errorHandler calls failedHandler on rejected fetch', async (
    ): Promise<void> => {
        const error = new Error('network')
        fetchResult = Promise.reject(error)

        errorHandler('a')

        await timeout()

        expect(failedHandlerCall).toStrictEqual([error])
        expect(reportedHandlerCall).toHaveLength(0)
    })

    test('errorHandler ignores issues', (): void => {
        errorHandler.issuesToIgnore = [{errorMessage: /Access is denied/}]
        errorHandler('Access is denied.')

        expect((issueToIgnoreHandlerCall[0] as Mapping).errorMessage)
            .toStrictEqual('Access is denied.')
        expect(issueToIgnoreHandlerCall[1])
            .toStrictEqual(errorHandler.issuesToIgnore[0])
        expect(fetchHandlerCalls).toHaveLength(0)

        issueToIgnoreHandlerCall = []
        errorHandler.issuesToIgnore = [{errorMessage: 'Access is denied.'}]
        errorHandler('Access is denied.')

        expect((issueToIgnoreHandlerCall[0] as Mapping).errorMessage)
            .toStrictEqual('Access is denied.')
        expect(fetchHandlerCalls).toHaveLength(0)

        issueToIgnoreHandlerCall = []
        errorHandler('Access is denied!')

        expect(issueToIgnoreHandlerCall).toHaveLength(0)
        expect(fetchHandlerCalls).toHaveLength(1)

        issueToIgnoreHandlerCall = []
        errorHandler.issuesToIgnore = []
        errorHandler('Access is denied.')

        expect(issueToIgnoreHandlerCall).toHaveLength(0)
        expect(fetchHandlerCalls).toHaveLength(2)
    })

    test('errorHandler matches issues completely', (): void => {
        errorHandler.issuesToIgnore = [
            // Only partially matching.
            {errorMessage: 'a', technologyDescription: 'other'},
            // Property not available in current issue.
            {browser: {name: 'IE'}},
            // Nested property matching.
            {engine: {name: /^$/}, errorMessage: /^b$/}
        ]

        errorHandler('a')

        expect(issueToIgnoreHandlerCall).toHaveLength(0)
        expect(fetchHandlerCalls).toHaveLength(1)

        errorHandler.issuesToIgnore = [
            {errorMessage: 'a', technologyDescription: 'unknown'}
        ]
        errorHandler.reported = {}
        errorHandler('a')

        expect(issueToIgnoreHandlerCall[1])
            .toStrictEqual(errorHandler.issuesToIgnore[0])
        expect(fetchHandlerCalls).toHaveLength(1)
    })

    test('errorHandler respects additional issues to ignore', (): void => {
        errorHandler.issuesToIgnore = [{errorMessage: 'a'}]
        errorHandler.additionalIssuesToIgnore = [{errorMessage: 'b'}]

        errorHandler('b')

        expect(issueToIgnoreHandlerCall[1])
            .toStrictEqual({errorMessage: 'b'})
        expect(fetchHandlerCalls).toHaveLength(0)

        errorHandler('c')
        errorHandler('d')

        expect(errorHandler.issuesToIgnore).toStrictEqual([{errorMessage: 'a'}])
        expect(getLastBody().issuesToIgnore)
            .toStrictEqual([{errorMessage: 'a'}, {errorMessage: 'b'}])
    })

    test('errorHandler serializes regular expressions', (): void => {
        errorHandler.issuesToIgnore = [{errorMessage: /^a\\b"$/}]

        errorHandler('c')

        expect(getLastBody().issuesToIgnore)
            .toStrictEqual([{errorMessage: '/^a\\\\b"$/'}])
    })

    test('errorHandler defaults', (): void => {
        const issueToIgnoreHandler = errorHandler.issueToIgnoreHandler
        const reportedHandler = errorHandler.reportedHandler
        const reportPath = errorHandler.reportPath

        delete (errorHandler as Partial<typeof errorHandler>).issuesToIgnore
        delete (errorHandler as Partial<typeof errorHandler>).reportedHandler
        errorHandler.reportPath = ''

        try {
            errorHandler('Script error.')
            errorHandler('NS_ERROR_FAILURE: something')

            expect(issueToIgnoreHandlerCall[1])
                .toStrictEqual({errorMessage: /^NS_ERROR[A-Z_]*:.*/})
            expect(fetchHandlerCalls).toHaveLength(0)
            expect(errorHandler.issuesToIgnore.length).toBeGreaterThan(20)

            errorHandler('a')

            expect(errorHandler.reportPath).toStrictEqual('/__error_report__')
            expect(fetchHandlerCalls[0][0])
                .toStrictEqual('http://localhost/__error_report__')
            expect(errorHandler.reportedHandler).not.toStrictEqual(
                reportedHandler
            )
        } finally {
            errorHandler.issueToIgnoreHandler = issueToIgnoreHandler
            errorHandler.reportPath = reportPath
        }
    })
    // endregion
})
