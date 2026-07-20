// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import type {Mapping} from 'clientnode'

import {timeout} from 'clientnode'
import {describe, expect, test} from '@jest/globals'

import {errorHandler, globalContext} from './index'

describe('errorreporter', (): void => {
    // region mockup
    let fetchHandlerCall: Array<unknown> = []
    globalContext.fetch = ((...parameter: Array<unknown>): Promise<string> => {
        fetchHandlerCall = parameter

        return Promise.resolve('dummyFetchResult')
    }) as unknown as typeof fetch

    let failedHandlerCall: Array<unknown> = []
    errorHandler.failedHandler = (...parameter: Array<unknown>) => {
        failedHandlerCall = parameter
    }

    let reportedHandlerCall: Array<unknown> = []
    errorHandler.reportedHandler = (...parameter: Array<unknown>) => {
        reportedHandlerCall = parameter
    }

    let issueToIgnoreHandlerCall: Array<unknown> = []
    errorHandler.issueToIgnoreHandler = (...parameter: Array<unknown>) => {
        issueToIgnoreHandlerCall = parameter
    }
    errorHandler.issuesToIgnore = []
    // endregion
    // region tests
    test('errorHandler', async (): Promise<void> => {
        expect(errorHandler.reported).toStrictEqual({})

        expect(errorHandler('')).toBeUndefined()
        expect(errorHandler('', '', 0, 0, {} as Error)).toBeUndefined()
        expect(failedHandlerCall).toHaveLength(0)
        expect(issueToIgnoreHandlerCall).toHaveLength(0)

        expect(typeof fetchHandlerCall[0]).toStrictEqual('string')
        expect(
            (fetchHandlerCall[0] as string).endsWith(errorHandler.reportPath)
        )
            .toStrictEqual(true)

        await timeout()

        expect(reportedHandlerCall[0]).toStrictEqual('dummyFetchResult')

        errorHandler.issuesToIgnore = [{errorMessage: /Access is denied/}]
        expect(errorHandler('Access is denied.')).toBeUndefined()
        expect(typeof (issueToIgnoreHandlerCall[0] as Mapping).errorMessage)
            .toStrictEqual('string')
        expect((issueToIgnoreHandlerCall[0] as Mapping).errorMessage)
            .toStrictEqual('Access is denied.')

        errorHandler.issuesToIgnore = [{errorMessage: 'Access is denied.'}]
        expect(typeof (issueToIgnoreHandlerCall[0] as Mapping).errorMessage)
            .toStrictEqual('string')
        expect((issueToIgnoreHandlerCall[0] as Mapping).errorMessage)
            .toStrictEqual('Access is denied.')
        expect(errorHandler('Access is denied.')).toBeUndefined()

        issueToIgnoreHandlerCall = []
        errorHandler.issuesToIgnore = []
        expect(errorHandler('Access is denied.')).toBeUndefined()
        expect(issueToIgnoreHandlerCall).toHaveLength(0)

        globalContext.fetch = null as unknown as typeof fetch

        expect(errorHandler('')).toBeUndefined()
        expect(failedHandlerCall).toHaveLength(0)
        expect(errorHandler('a')).toBeUndefined()
        expect(failedHandlerCall[0]).toBeInstanceOf(Error)
    })
    // endregion
})
