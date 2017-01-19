// @flow
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
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import Tools from 'clientnode'
import type {$DomNode} from 'clientnode'
import registerTest from 'clientnode/test'
// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register')
} catch (error) {}
// endregion
registerTest(function(roundType:string, targetTechnology:?string, $:any):void {
    // region prepare environment
    const index:Object = require('./index')
    const globalContext:Object = index.globalContext
    const onError:Function = index.default
    globalContext.Headers = class {}
    let fetchHandlerCall:Array<any> = []
    globalContext.fetch = (...parameter:Array<any>):Promise<string> => {
        fetchHandlerCall = parameter
        return Promise.resolve('dummyFetchResult')
    }
    let failedHandlerCall:Array<any> = []
    onError.failedHandler = (...parameter:Array<any>):void => {
        failedHandlerCall = parameter
    }
    let reportedHandlerCall:Array<any> = []
    onError.reportedHandler = (...parameter:Array<any>):void => {
        reportedHandlerCall = parameter
    }
    let caseToIgnoreHandlerCall:Array<any> = []
    onError.caseToIgnoreHandler = (...parameter:Array<any>):void => {
        caseToIgnoreHandlerCall = parameter
    }
    onError.casesToIgnore = []
    // endregion
    // region tests
    this.test('onError', async (assert:Object):Promise<void> => {
        const done:Function = assert.async()
        assert.deepEqual(onError.reported, {})
        assert.notOk(onError('', '', 0, 0, {}))
        assert.deepEqual(failedHandlerCall, [])
        assert.deepEqual(caseToIgnoreHandlerCall, [])
        assert.ok(fetchHandlerCall[0].endsWith(
            globalContext.onerror.reportPath))
        await Tools.timeout()
        assert.strictEqual(reportedHandlerCall[0], 'dummyFetchResult')
        if (targetTechnology === 'node') {
            const protocol:string = globalContext.location.protocol
            globalContext.location.protocol = 'file:'
            assert.notOk(onError('', '', 0, 0, {}))
            globalContext.location.protocol = protocol
        }
        onError.casesToIgnore = [{errorMessage: /Access is denied/}]
        assert.notOk(onError('Access is denied.', '', 0, 0, {}))
        assert.strictEqual(
            caseToIgnoreHandlerCall[0].errorMessage, 'Access is denied')
        caseToIgnoreHandlerCall = []
        onError.casesToIgnore = []
        // TODO check vor empty errorMessage
        assert.notOk(onError('Access is denied.', '', 0, 0, {}))
        assert.strictEqual(
            caseToIgnoreHandlerCall[0].errorMessage, 'Access is denied')
        globalContext.fetch = null
        assert.notOk(onError('', '', 0, 0, {}))
        assert.deepEqual(failedHandlerCall, [])
        assert.notOk(onError('a', '', 0, 0, {}))
        assert.ok(failedHandlerCall[0] instanceof Error)
        done()
    })
    // endregion
}, ['plain'])
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
