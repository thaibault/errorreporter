// #!/usr/bin/env node
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
// region imports
import Tools from 'clientnode'

import {errorHandler, globalContext} from './index'
import {NativeErrorHandler} from './type'
// endregion
describe('errorreporter', ():void => {
    // region mockup
    globalContext.Headers = (class {} as unknown as Headers)
    let fetchHandlerCall:Array<any> = []
    globalContext.fetch = ((...parameter:Array<any>):Promise<string> => {
        fetchHandlerCall = parameter
        return Promise.resolve('dummyFetchResult')
    }) as unknown as typeof fetch
    let failedHandlerCall:Array<any> = []
    errorHandler.failedHandler = (...parameter:Array<any>):void => {
        failedHandlerCall = parameter
    }
    let reportedHandlerCall:Array<any> = []
    errorHandler.reportedHandler = (...parameter:Array<any>):void => {
        reportedHandlerCall = parameter
    }
    let issueToIgnoreHandlerCall:Array<any> = []
    errorHandler.issueToIgnoreHandler = (...parameter:Array<any>):void => {
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
        expect(fetchHandlerCall[0].endsWith(errorHandler.reportPath))
            .toStrictEqual(true)
        await Tools.timeout()
        expect(reportedHandlerCall[0]).toStrictEqual('dummyFetchResult')
        errorHandler.issuesToIgnore = [{errorMessage: /Access is denied/}]
        expect(errorHandler('Access is denied.')).toStrictEqual(false)
        expect(issueToIgnoreHandlerCall[0].errorMessage)
            .toStrictEqual('Access is denied.')
        errorHandler.issuesToIgnore = [{errorMessage: 'Access is denied.'}]
        expect(issueToIgnoreHandlerCall[0].errorMessage)
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
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
