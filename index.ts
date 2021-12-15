// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module errorreporter */
'use strict'
/* !
    region header
    [Project page](https://torben.website/errorreporter)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import {Mapping} from 'clientnode/type'

import {
    BaseLocation, ErrorHandler, Issue, IssueSpecification, NativeErrorHandler
} from './type'
// endregion
export const determineGlobalContext:(() => typeof globalThis) = (
):typeof globalThis => {
    if (typeof globalThis === 'undefined') {
        if (typeof window === 'undefined') {
            if (typeof global === 'undefined')
                return ((typeof module === 'undefined') ? {} : module) as
                    typeof globalThis
            if ('window' in global)
                return global.window
            return global as unknown as typeof globalThis
        }
        return window as unknown as typeof globalThis
    }
    return globalThis as unknown as typeof globalThis
}
export const globalContext:typeof globalThis = determineGlobalContext()
let issue:Issue = {} as Issue
export const errorHandler:ErrorHandler = ((
    errorMessage:Event|string,
    url?:string,
    lineNumber?:number,
    columnNumber?:number,
    error?:Error,
    ...additionalParameter:Array<any>
):false|void => {
    const location:BaseLocation = globalContext.window?.location ?
        globalContext.window.location as BaseLocation :
        errorHandler.location
    /*
        Sends an error report to current requested domain via ajax in json
        format. Supported by Chrome 13+, Firefox 6.0+, Internet Explorer 5.5+,
        Opera 11.60+, Safari 5.1+
    */
    // URL to send error messages to.
    if (!errorHandler.reportPath)
        errorHandler.reportPath = '/__error_report__'
    // Handler to call if error reporting fails.
    if (!errorHandler.failedHandler)
        errorHandler.failedHandler = (error:Error):void => {
            if ('alert' in globalContext)
                globalContext.alert(error)
        }
    // All issues which completely match will be ignored.
    if (!errorHandler.issuesToIgnore)
        errorHandler.issuesToIgnore = [
            /* eslint-disable max-len */
            {browser: {name: 'IE'}},
            {browser: {major: /[123456789]|10/, name: 'Firefox'}},
            {errorMessage: /Access is denied/},
            {errorMessage: /Das System kann auf die Datei nicht zugreifen/},
            {errorMessage: /Der RPC-Server ist nicht verfügbar/},
            {errorMessage: 'Error loading script'},
            {errorMessage: /Für diesen Vorgang ist nicht genügend Speicher verfügbar/},
            {errorMessage: /^In den Microsoft-Interneterweiterungen ist ein interner Fehler aufgetreten\./},
            {errorMessage: /^IndexSizeError: Index or size is negative or greater than the allowed amount/},
            {errorMessage: /Nicht genügend Arbeitsspeicher/},
            {errorMessage: /^NS_ERROR[A-Z_]*:.*/},
            {errorMessage: /Permission denied to access property/},
            {errorMessage: /^QuotaExceededError:/},
            {errorMessage: /^ReferenceError: "gapi" is not defined\..*/},
            {errorMessage: 'Script error.'},
            {errorMessage: /^SecurityError/},
            {errorMessage: /TypeError: Expected argument of type object, but instead had type object/},
            {errorMessage: /^TypeError: undefined is not an object \(evaluating 'window\.__firefox__\..+'\)$/},
            {errorMessage: /Uncaught SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied/},
            {errorMessage: /Uncaught ReferenceError: ztePageScrollModule is not defined/},
            {errorMessage: 'Unbekannter Fehler'},
            {errorMessage: 'UnknownError'},
            {errorMessage: /^uncaught exception: /},
            {errorMessage: /Zugriff verweigert/}
            /* eslint-enable max-len */
        ]
    if (Array.isArray(errorHandler.additionalIssuesToIgnore))
        errorHandler.issuesToIgnore = errorHandler.issuesToIgnore.concat(
            errorHandler.additionalIssuesToIgnore
        )
    // Handler to call for browser which should be ignored.
    if (!errorHandler.issueToIgnoreHandler)
        errorHandler.issueToIgnoreHandler = (
            issue:Issue, issueToIgnore:IssueSpecification
        ):void => {
            /*
                We should avoid error message if a specific error message
                should be ignored.
            */
            if (!issueToIgnore.errorMessage)
                globalContext.alert(
                    `Your technology "${issue.technologyDescription}" to ` +
                    `display this website isn't supported any more. Please ` +
                    'upgrade your browser engine.'
                )
        }
    // Handler to call when error reporting was successful.
    if (!errorHandler.reportedHandler)
        errorHandler.reportedHandler = ():void => {
            // Do nothing.
        }
    try {
        issue.technologyDescription = 'Unclear'
        if (issue.browser) {
            issue.technologyDescription =
                `${issue.browser.name} ${issue.browser.major} (` +
                `${issue.browser.version} | ${issue.engine.name} ` +
                `${issue.engine.version}) | ${issue.os.name} ` +
                issue.os.version
            if (
                issue.device?.model &&
                issue.device.type &&
                issue.device.vendor
            )
                issue.technologyDescription +=
                    ` | ${issue.device.model} ${issue.device.type}` +
                    ` ${issue.device.vendor}`
        }
        issue.errorMessage = `${errorMessage as string}` || 'Unclear'
        // Checks if given object completely matches given match object.
        const matches:Function = (
            issueItem:any, issueItemSpecification:any
        ):boolean => {
            if (
                Object.prototype.toString.call(issueItemSpecification) ===
                    '[object Object]' &&
                Object.prototype.toString.call(issueItem) === '[object Object]'
            ) {
                for (const key in issueItemSpecification)
                    if (
                        issueItemSpecification.hasOwnProperty(key) &&
                        !(
                            issueItem[key] &&
                            matches(
                                issueItem[key], issueItemSpecification[key]
                            )
                        )
                    )
                        return false
                return true
            }
            if (
                Object.prototype.toString.call(issueItemSpecification) ===
                    '[object RegExp]'
            )
                return issueItemSpecification.test(`${issueItem}`)
            return issueItemSpecification === issueItem
        }
        for (const issueToIgnore of errorHandler.issuesToIgnore)
            if (matches(issue, issueToIgnore)) {
                errorHandler.issueToIgnoreHandler(issue, issueToIgnore)
                if (typeof errorHandler.callbackBackup === 'function')
                    return errorHandler.callbackBackup(
                        errorMessage,
                        url,
                        lineNumber,
                        columnNumber,
                        error,
                        ...additionalParameter
                    )
            }
        const toString:Function = (value:any):string => {
            if (['boolean', 'number'].includes(typeof value) || value === null)
                return `${value}`
            return '"' +
                `${value}`
                    .replace(/\\/g, '\\\\')
                    .replace(/(?:\r\n|\r)/g, '\\n')
                    .replace(/"/g, '\\"') +
                '"'
        }
        const serialize:Function = (value:any):string => {
            if (
                value !== null &&
                typeof value === 'object' &&
                !(value instanceof RegExp)
            ) {
                if (Array.isArray(value)) {
                    let result:string = '['
                    for (const item of value) {
                        if (result !== '[')
                            result += ','
                        result += serialize(item)
                    }
                    return `${result}]`
                }
                let result:string = '{'
                for (const key in value)
                    if (value.hasOwnProperty(key)) {
                        if (result !== '{')
                            result += ','
                        result += `"${key}":${serialize(value[key])}`
                    }
                return `${result}}`
            }
            return `${toString(value)}`
        }
        const errorKey:string =
            `${errorMessage}#${location.href}#${lineNumber}#${columnNumber}`
        if (!errorHandler.reported[errorKey]) {
            errorHandler.reported[errorKey] = true
            const portPrefix:string = location.port ? `:${location.port}` : ''
            const headers:Mapping = {'Content-type': 'application/json'}
            globalContext.fetch(
                `${location.protocol}//${location.hostname}${portPrefix}` +
                errorHandler.reportPath,
                {
                    body: serialize({
                        absoluteURL: location.href,
                        columnNumber: columnNumber,
                        errorMessage: errorMessage,
                        issuesToIgnore: errorHandler.issuesToIgnore,
                        lineNumber: lineNumber,
                        stack: error?.stack,
                        technologyDescription: issue.technologyDescription,
                        url: url,
                        userAgent: (
                            globalContext.window?.navigator?.userAgent ||
                            'unclear'
                        )
                    }),
                    headers: globalContext.Headers ? 
                        new globalContext.Headers(headers) :
                        headers,
                    method: 'PUT'
                }
            )
                .then(errorHandler.reportedHandler)
                .catch(errorHandler.failedHandler)
        }
    } catch (error) {
        errorHandler.failedHandler(error as Error)
    }
    if (typeof errorHandler.callbackBackup === 'function')
        return errorHandler.callbackBackup(
            errorMessage,
            url,
            lineNumber,
            columnNumber,
            error,
            ...additionalParameter
        )
}) as ErrorHandler
errorHandler.location = {
    hostname: 'localhost',
    href: 'http://localhost',
    protocol: 'http'
}
const onErrorCallbackBackup:NativeErrorHandler|null = globalContext.onerror
errorHandler.callbackBackup = onErrorCallbackBackup ?
    onErrorCallbackBackup.bind(globalContext) :
    ():false => false
/*
    Bound reported errors to globale error handler to avoid global variable
    pollution.
*/
errorHandler.reported = {}
try {
    issue = require('ua-parser-js')() as Issue
} catch (error) {}
export default errorHandler
// Register extended error handler globally.
globalContext.onerror = errorHandler
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
