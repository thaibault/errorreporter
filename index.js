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
const globalContext:Object = (():Object => {
    if (typeof window === 'undefined') {
        if (typeof global === 'undefined')
            return (typeof module === 'undefined') ? {} : module
        if ('window' in global)
            return global.window
        return global
    }
    return window
})()
globalContext.onerror = (
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
    const errorReportPath:string = '/__error_report__'
    // Handler to call if error reporting fails.
    const errorReportFailedHandler:Function = (error:Error):void => {
        if (
            'alert' in globalContext && 'options' in globalContext &&
            'debug' in globalContext.options && globalContext.options.debug
        )
            globalContext.alert(error)
        /*
            If we have a Bad Gateway error "only" the proxy server should have
            reported the error.
        */
        /*
        else if(status !== 502)
            window.alert(error);
        */
    }
    /*
        All technologies which completely match will be ignored.

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
    const technologiesToIgnore:Array<PlainObject> = [
        {browser: {name: 'IE', major: /[56789]/}},
        {errorMessage: /^Access is denied\.[\s\S]+/},
        {errorMessage: /^Error: Das System kann auf die Datei nicht zugreifen[\s\S]+/},
        {errorMessage: /^Error: Permission denied to access property .+/},
        {errorMessage: /Für diesen Vorgang ist nicht genügend Speicher verfügbar\.[\s\S]+/},
        {errorMessage: 'Nicht genügend Arbeitsspeicher.'},
        {errorMessage: /^NS_ERROR[A-Z_]*:.*/},
        {errorMessage: /^QuotaExceededError:/},
        {errorMessage: /^ReferenceError: "gapi" is not defined\..*/},
        {errorMessage: 'Script error.'},
        {errorMessage: /^SecurityError: .*The operation is insecure\.$/},
        {errorMessage: /^TypeError: Expected argument of type object, but instead had type object/},
        {errorMessage: /^TypeError: null is not an object \(evaluating 'window\.localStorage.*/},
        {errorMessage: /^uncaught exception: /},
        {errorMessage: /^uncaught exception: \[Exception\.\.\. "Not enough arguments".*/},
        {errorMessage: "Uncaught SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document."},
        {errorMessage: 'Unbekannter Fehler.'},
        {errorMessage: /^Zugriff verweigert\.?[\s\S]+/},
        {
            browser: {name: 'Opera'},
            errorMessage: /^Uncaught SecurityError: Blocked a frame with origin "/
        },
        {
            browser: {name: 'IE', version: '11'},
            errorMessage: 'Das System kann den angegebenen Pfad nicht finden.\n'
        },
        {
            browser: {name: 'IE'},
            errorMessage: 'In den Microsoft-Interneterweiterungen ist ein interner Fehler aufgetreten.\r\n'
        }
    ]
    // Handler to call for browser which should be ignored.
    const technologyIgnoredHandler:Function = (
        technology:PlainObject, technologyToIgnore:PlainObject
    ):void => {
        // NOTE: We should avoid error message if a specific error message
        // should be ignored.
        if (!technologyToIgnore.errorMessage)
            globalContext.alert(
                `Your technology "${technology.description}" to display this` +
                `website isn't supported any more. Please upgrade your ` +
                'browser engine.')
    }
    try {
        const technology:string = 'Unclear'
        if (globalContext.UAParser) {
            const technology:PlainObject = (new globalContext.UAParser(
            )).getResult()
            technology.errorMessage = errorMessage
            technology.description =
                `${technology.browser.name} ${technology.browser.major}  (` +
                `${technology.browser.version} | ${technology.engine.name} ` +
                `${technology.engine.version}) | ${technology.os.name} ` +
                technology.os.version
            if (
                technology.device && technology.device.model &&
                technology.device.type && technology.device.vendor
            )
                technology.description +=
                    ` | ${technology.device.model} ${technology.device.type}` +
                    ` ${technology.device.vendor}`
            const checkAgainTechnologyToIgnore:Function = (
                object:PlainObject, ignoreObject:PlainObject
            ):boolean => {
                /*
                    Check if given ignore object completely matches given
                    object.
                */
                for (const key:string in ignoreObject)
                    if (ignoreObject.hasOwnProperty(key))
                        if (Object.prototype.toString.call(
                            ignoreObject[key]
                        ) === '[object Object]') {
                            if (!checkAgainTechnologyToIgnore(
                                object[key], ignoreObject[key]
                            ))
                                return false
                        } else if (key in object)
                            if (typeof ignoreObject[key] === 'string' || !(
                                'test' in ignoreObject[key]
                            )) {
                                if (ignoreObject[key] !== object[key])
                                    return false
                            } else if (!ignoreObject[key].test(
                                `${object[key]}`
                            ))
                                return false
                return true
            }
            for (const technologyToIgnore:PlainObject of technologiesToIgnore)
                if (checkAgainTechnologyToIgnore(
                    technology, technologyToIgnore
                )) {
                    technologyIgnoredHandler(technology, technologyToIgnore)
                    return false
                }
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
        if (!globalContext.onerror.reportedErrors[errorKey]) {
            globalContext.onerror.reportedErrors[errorKey] = true
            fetch(
                `${location.protocol}//${globalContext.location.hostname}:` +
                `${globalContext.location.port}${errorReportPath}`, {
                    headers: new Headers({'Content-type': 'application/json'}),
                    body: serializeJSON({
                        technologyDescription: technology.description ||
                            'unclear',
                        url: url,
                        errorMessage: errorMessage,
                        absoluteURL: window.location.href,
                        lineNumber: lineNumber,
                        columnNumber: columnNumber,
                        userAgent: window.navigator.userAgent,
                        stack: errorObject && errorObject.stack
                    }),
                    method: 'PUT'
                }
            ).catch(errorReportFailedHandler)
        }
    } catch(error) {
        errorReportFailedHandler(error)
    }
    return false
}
// NOTE: Trick to avoid global variable pollution.
globalContext.onerror.reportedErrors = {}
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
