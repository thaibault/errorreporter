// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import {describe, expect, test} from '@jest/globals'
import {Mapping, timeout} from 'clientnode'

import {errorHandler, globalContext} from './index'
import {NativeErrorHandler} from './type'

describe('errorreporter', ():void => {
    // region mockup
    let fetchHandlerCall:Array<unknown> = []
    globalContext.fetch = ((...parameter:Array<unknown>):Promise<string> => {
        fetchHandlerCall = parameter

        return Promise.resolve('dummyFetchResult')
    }) as unknown as typeof fetch

    let failedHandlerCall:Array<unknown> = []
    errorHandler.failedHandler = (...parameter:Array<unknown>):void => {
        failedHandlerCall = parameter
    }

    let reportedHandlerCall:Array<unknown> = []
    errorHandler.reportedHandler = (...parameter:Array<unknown>):void => {
        reportedHandlerCall = parameter
    }

    let issueToIgnoreHandlerCall:Array<unknown> = []
    errorHandler.issueToIgnoreHandler = (...parameter:Array<unknown>):void => {
        issueToIgnoreHandlerCall = parameter
    }
    errorHandler.issuesToIgnore = []
    // endregion
    // region tests
    test('errorHandler', async ():Promise<void> => {
        expect(errorHandler.reported).toStrictEqual({})

        const callbackBackupBackup:NativeErrorHandler =
            errorHandler.callbackBackup
        errorHandler.callbackBackup = (():4 => 4) as
            unknown as NativeErrorHandler

        expect(errorHandler('')).toStrictEqual(4)

        errorHandler.callbackBackup = callbackBackupBackup

        expect(errorHandler('')).toStrictEqual(false)
        expect(errorHandler('', '', 0, 0, {} as Error)).toStrictEqual(false)
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
        expect(errorHandler('Access is denied.')).toStrictEqual(false)
        expect(typeof (issueToIgnoreHandlerCall[0] as Mapping).errorMessage)
            .toStrictEqual('string')
        expect((issueToIgnoreHandlerCall[0] as Mapping).errorMessage)
            .toStrictEqual('Access is denied.')

        errorHandler.issuesToIgnore = [{errorMessage: 'Access is denied.'}]
        expect(typeof (issueToIgnoreHandlerCall[0] as Mapping).errorMessage)
            .toStrictEqual('string')
        expect((issueToIgnoreHandlerCall[0] as Mapping).errorMessage)
            .toStrictEqual('Access is denied.')
        expect(errorHandler('Access is denied.')).toStrictEqual(false)

        issueToIgnoreHandlerCall = []
        errorHandler.issuesToIgnore = []
        expect(errorHandler('Access is denied.')).toStrictEqual(false)
        expect(issueToIgnoreHandlerCall).toHaveLength(0)

        globalContext.fetch = null as unknown as typeof fetch

        expect(errorHandler('')).toStrictEqual(false)
        expect(failedHandlerCall).toHaveLength(0)
        expect(errorHandler('a')).toStrictEqual(false)
        expect(failedHandlerCall[0]).toBeInstanceOf(Error)
    })
    // endregion
})
