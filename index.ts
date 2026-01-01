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
import {Mapping, Primitive, ValueOf} from 'clientnode'

import {
    BaseLocation, ErrorHandler, Issue, IssueSpecification, NativeErrorHandler
} from './type'

export const determineGlobalContext: (() => typeof globalThis) = (
): typeof globalThis => {
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

export const globalContext: typeof globalThis = determineGlobalContext()

export const errorHandler: ErrorHandler = ((
    errorMessage: Event | string,
    url?: string,
    lineNumber?: number,
    columnNumber?: number,
    error?: Error,
    ...additionalParameter: Array<unknown>
): false | undefined => {
    const issue: Issue = {...BROWSER_ISSUE}

    const location: BaseLocation =
        Object.prototype.hasOwnProperty.call(globalContext, 'window') &&
        Object.prototype.hasOwnProperty.call(
            globalContext.window, 'location'
        ) ?
            globalContext.window.location as BaseLocation :
            errorHandler.location
    /*
        Sends an error report to current requested domain via ajax in JSON
        format. Supported by Chrome 13+, Firefox 6.0+, Internet Explorer 5.5+,
        Opera 11.60+, Safari 5.1+
    */
    // URL to send error messages to.
    if (!errorHandler.reportPath)
        errorHandler.reportPath = '/__error_report__'

    // Handler to call if error reporting fails.
    if (!Object.prototype.hasOwnProperty.call(errorHandler, 'failedHandler'))
        errorHandler.failedHandler = (error: unknown) => {
            if ('alert' in globalContext)
                globalContext.alert(error)
        }

    // All issues which completely match will be ignored.
    if (!Object.prototype.hasOwnProperty.call(errorHandler, 'issuesToIgnore'))
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
    if (!Object.prototype.hasOwnProperty.call(
        errorHandler, 'issueToIgnoreHandler'
    ))
        errorHandler.issueToIgnoreHandler = (
            issue: Issue, issueToIgnore: IssueSpecification
        ) => {
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
    if (!Object.prototype.hasOwnProperty.call(
        errorHandler, 'reportedHandler'
    ))
        errorHandler.reportedHandler = () => {
            // Do nothing.
        }

    try {
        issue.errorMessage = String(errorMessage as Primitive) || 'Unclear'
        // Checks if given object completely matches given match object.
        const matches = <
            I = Issue, IS extends Mapping<unknown> = IssueSpecification
        >(issueItem: I, issueItemSpecification: IS): boolean => {
            if (
                Object.prototype.toString.call(issueItemSpecification) ===
                    '[object Object]' &&
                Object.prototype.toString.call(issueItem) === '[object Object]'
            ) {
                for (const key of Object.keys(issueItemSpecification))
                    if (!(
                        issueItem[key as keyof I] &&
                        matches<ValueOf<I>, Mapping<unknown>>(
                            issueItem[key as keyof I],
                            issueItemSpecification[key as keyof IS] as
                                Mapping<unknown>
                        )
                    ))
                        return false

                return true
            }

            if (
                Object.prototype.toString.call(issueItemSpecification) ===
                    '[object RegExp]'
            )
                return (issueItemSpecification as unknown as RegExp)
                    .test(String(issueItem))

            return issueItemSpecification as unknown === issueItem as unknown
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

        const toString = (value: unknown): string => {
            if (['boolean', 'number'].includes(typeof value) || value === null)
                return String(value)

            return '"' +
                String(value as Primitive)
                    .replace(/\\/g, '\\\\')
                    .replace(/\r\n|\r/g, '\\n')
                    .replace(/"/g, '\\"') +
                '"'
        }

        const serialize = (value: unknown): string => {
            if (
                value !== null &&
                typeof value === 'object' &&
                !(value instanceof RegExp)
            ) {
                if (Array.isArray(value)) {
                    let result = '['
                    for (const item of value) {
                        if (result !== '[')
                            result += ','
                        result += serialize(item)
                    }

                    return `${result}]`
                }

                let result = '{'
                for (const key of Object.keys(value)) {
                    if (result !== '{')
                        result += ','
                    result +=
                        `"${key}":` +
                        serialize((value as Mapping<unknown>)[key])
                }

                return `${result}}`
            }

            return toString(value)
        }

        const errorKey =
            `${errorMessage as string}#${location.href}#` +
            `${String(lineNumber)}#${String(columnNumber)}`
        if (!Object.prototype.hasOwnProperty.call(
            errorHandler.reported, errorKey
        )) {
            errorHandler.reported[errorKey] = true
            const portPrefix = location.port ? `: ${location.port}` : ''
            const headers = {'Content-type': 'application/json'}
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
                            Object.prototype.hasOwnProperty.call(
                                globalContext, 'window'
                            ) &&
                            Object.prototype.hasOwnProperty.call(
                                globalContext.window, 'navigator'
                            ) &&
                            globalContext.window.navigator.userAgent ?
                                globalContext.window.navigator.userAgent :
                                'unclear'
                        )
                    }),
                    headers: Object.prototype.hasOwnProperty.call(
                        globalContext, 'Headers'
                    ) ?
                        new globalContext.Headers(headers) :
                        headers,
                    method: 'PUT'
                }
            )
                .then(errorHandler.reportedHandler)
                .catch((error: unknown) => {
                    errorHandler.failedHandler(error as Error)
                })
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

const onErrorCallbackBackup: NativeErrorHandler | null = globalContext.onerror
errorHandler.callbackBackup = onErrorCallbackBackup ?
    onErrorCallbackBackup.bind(globalContext) :
    () => false
/*
    Bound reported errors to globale error handler to avoid global variable
    pollution.
*/
errorHandler.reported = {}

export const BASE_ISSUE: Issue = {
    errorMessage: '',
    technologyDescription: 'Unclear',
    ua: '',

    engine: {
        name: '',
        version: ''
    },
    os: {
        name: '',
        version: ''
    }
}

export let BROWSER_ISSUE: Issue = {...BASE_ISSUE}

try {
    BROWSER_ISSUE = {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        ...BROWSER_ISSUE, ...(require('ua-parser-js') as () => Issue)()
    }
} catch {
    // Ignore error.
}
try {
    if (BROWSER_ISSUE.browser) {
        BROWSER_ISSUE.technologyDescription =
            `${BROWSER_ISSUE.browser.name} ${BROWSER_ISSUE.browser.major} (` +
            `${BROWSER_ISSUE.browser.version} | ${BROWSER_ISSUE.engine.name} ` +
            `${BROWSER_ISSUE.engine.version}) | ${BROWSER_ISSUE.os.name} ` +
            BROWSER_ISSUE.os.version

        if (
            BROWSER_ISSUE.device?.model &&
            BROWSER_ISSUE.device.type &&
            BROWSER_ISSUE.device.vendor
        )
            BROWSER_ISSUE.technologyDescription +=
                ` | ${BROWSER_ISSUE.device.model} ` +
                `${BROWSER_ISSUE.device.type} ${BROWSER_ISSUE.device.vendor}`
    }
} catch (error) {
    console.warn(error)
}

export default errorHandler

// Register extended error handler globally.
globalContext.onerror = errorHandler
