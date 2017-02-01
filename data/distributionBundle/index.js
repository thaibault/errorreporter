// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module errorReporter */
'use strict'
/* !
    region header
    [Project page](http://torben.website/errorReporter)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import type {PlainObject} from 'clientnode'
// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register')
} catch (error) {}
// endregion
export const globalContext:Object = (():Object => {
    if (typeof window === 'undefined') {
        if (typeof global === 'undefined')
            return (typeof module === 'undefined') ? {} : module
        if ('window' in global)
            return global.window
        return global
    }
    return window
})()
export default globalContext.onerror = (
    errorMessage:string, url:string, lineNumber:number, columnNumber:number,
    errorObject:Object
):boolean => {
    if (!globalContext.location.protocol.startsWith('http'))
        return false
    /*
        Sends an error report to current requested domain via ajax in json
        format. Supported by Chrome 13+, Firefox 6.0+, Internet Explorer 5.5+,
        Opera 11.60+, Safari 5.1+
    */
    // URL to send error messages to.
    if (!globalContext.onerror.reportPath)
        globalContext.onerror.reportPath = '/__error_report__'
    // Handler to call if error reporting fails.
    if (!globalContext.onerror.failedHandler)
        globalContext.onerror.failedHandler = (error:Error):void => {
            if ('alert' in globalContext)
                globalContext.alert(error)
        }
    /*
        All cases which completely match will be ignored.

        Possible structure (unneeded keys can be omitted):

        {
            ua: //,
            description: //,
            errorMessage: //,
            browser: {
                name: //,
                version: //,
                major: //
            },
            engine: {
                name: //,
                version: //
            },
            os: {
                name: //,
                version: //
            },
            device: {
                model: //,
                type: //,
                vendor: //
            },
            cpu: {
                architecture: //
            }
        }
    */
    if (!globalContext.onerror.casesToIgnore)
        globalContext.onerror.casesToIgnore = [
            {browser: {name: 'IE', major: /[56789]/}},
            {errorMessage: /Access is denied/},
            {errorMessage: /Das System kann auf die Datei nicht zugreifen/},
            {errorMessage: 'Error loading script'},
            {errorMessage: /Permission denied to access property/},
            {errorMessage: /Für diesen Vorgang ist nicht genügend Speicher verfügbar/},
            {errorMessage: /Nicht genügend Arbeitsspeicher/},
            {errorMessage: /^NS_ERROR[A-Z_]*:.*/},
            {errorMessage: /^QuotaExceededError:/},
            {errorMessage: /^ReferenceError: "gapi" is not defined\..*/},
            {errorMessage: 'Script error.'},
            {errorMessage: /SecurityError:/},
            {errorMessage: /TypeError: Expected argument of type object, but instead had type object/},
            {errorMessage: 'TypeError: window.localStorage is null'},
            {errorMessage: /null is not an object \(evaluating 'window\.localStorage/},
            {errorMessage: /^uncaught exception: /},
            {errorMessage: /Uncaught SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied/},
            {errorMessage: /Unbekannter Fehler/},
            {errorMessage: /Zugriff verweigert/},
            {
                browser: {name: 'IE', version: '11'},
                errorMessage: /Das System kann den angegebenen Pfad nicht finden/
            },
            {
                browser: {name: 'IE'},
                errorMessage: /In den Microsoft-Interneterweiterungen ist ein interner Fehler aufgetreten/
            }
        ]
    // Handler to call for browser which should be ignored.
    if (!globalContext.onerror.caseToIgnoreHandler)
        globalContext.onerror.caseToIgnoreHandler = (
            instance:PlainObject, caseToIgnore:PlainObject
        ):void => {
            /*
                We should avoid error message if a specific error message
                should be ignored.
            */
            if (!caseToIgnore.errorMessage)
                globalContext.alert(
                    `Your technology "${instance.technologyDescription}" to ` +
                    `display this website isn't supported any more. Please ` +
                    'upgrade your browser engine.')
        }
    // Handler to call when error reporting was successful.
    if (!globalContext.onerror.reportedHandler)
        globalContext.onerror.reportedHandler = ():void => {}
    try {
        let instance:PlainObject = {technologyDescription: 'Unclear'}
        if (globalContext.UAParser) {
            instance = (new globalContext.UAParser()).getResult()
            instance.technologyDescription =
                `${instance.browser.name} ${instance.browser.major}  (` +
                `${instance.browser.version} | ${instance.engine.name} ` +
                `${instance.engine.version}) | ${instance.os.name} ` +
                instance.os.version
            if (
                instance.device && instance.device.model &&
                instance.device.type && instance.device.vendor
            )
                instance.technologyDescription +=
                    ` | ${instance.device.model} ${instance.device.type} ` +
                    instance.device.vendor
        }
        instance.errorMessage = errorMessage
        // Checks if given object completely matches given match object.
        const checkIfCaseMatches:Function = (
            object:any, matchObject:any
        ):boolean => {
            if (Object.prototype.toString.call(
                matchObject
            ) === '[object Object]' && Object.prototype.toString.call(
                object
            ) === '[object Object]') {
                for (const key:string in matchObject)
                    if (matchObject.hasOwnProperty(key)) {
                        if (!(key in object && checkIfCaseMatches(
                            object[key], matchObject[key]
                        )))
                            return false
                    }
                return true
            }
            if (Object.prototype.toString.call(
                matchObject
            ) === '[object RegExp]')
                return matchObject.test(`${object}`)
            return matchObject === object
        }
        for (
            const caseToIgnore:PlainObject of
            globalContext.onerror.casesToIgnore
        )
            if (checkIfCaseMatches(instance, caseToIgnore)) {
                globalContext.onerror.caseToIgnoreHandler(
                    instance, caseToIgnore)
                return false
            }
        let serializeJSON:Function
        if (globalContext.JSON && globalContext.JSON.stringify)
            serializeJSON = globalContext.JSON.stringify
        else
            serializeJSON = (object:Object):string => {
                const toString:Function = (value:any):string => {
                    value = `${value}`
                    if(value.replace)
                        return value.replace(/(?:\r\n|\r|\n)/g, '\\n').replace(
                            /\\?"/g, '\\"')
                    return value
                }
                let result:string = '{'
                for (const key:string in object)
                    if (object.hasOwnProperty(key)) {
                        if (result !== '{')
                            result += ','
                        result += `"${key}":`
                        if (
                            typeof object[key] === 'boolean' ||
                            typeof object[key] === 'number' &&
                            /[0-9.]+/.test('' + object[key]) ||
                            object[key] === null
                        )
                            result += `${object[key]}`
                        else
                            result += `"${toString(object[key])}"`
                    }
                return `${result}}`
            }
        const errorKey:string =
            `${errorMessage}#${globalContext.location.href}#${lineNumber}#` +
            columnNumber
        if (!globalContext.onerror.reported[errorKey]) {
            globalContext.onerror.reported[errorKey] = true
            const portPrefix:string = globalContext.location.port ?
                `:${globalContext.location.port}` : ''
            globalContext.fetch(
                `${globalContext.location.protocol}//` +
                `${globalContext.location.hostname}${portPrefix}` +
                globalContext.onerror.reportPath, {
                    headers: new globalContext.Headers({
                        'Content-type': 'application/json'}),
                    body: serializeJSON({
                        technologyDescription: instance.technologyDescription,
                        url: url,
                        errorMessage: errorMessage,
                        absoluteURL: globalContext.window.location.href,
                        lineNumber: lineNumber,
                        columnNumber: columnNumber,
                        userAgent: globalContext.window.navigator.userAgent,
                        stack: errorObject && errorObject.stack
                    }),
                    method: 'PUT'
                }
            )
            .then(globalContext.onerror.reportedHandler)
            .catch(globalContext.onerror.failedHandler)
        }
    } catch(error) {
        globalContext.onerror.failedHandler(error)
    }
    return false
}
/*
    Bound reported errors to globale error handler to avoid global variable
    pollution.
*/
globalContext.onerror.reported = {}
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
