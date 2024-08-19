// -*- coding: utf-8 -*-
/** @module type */
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
import {Mapping, RecursivePartial} from 'clientnode'

export interface Issue<Type = string> {
    errorMessage:Type

    technologyDescription:Type
    ua:Type

    browser?:{
        name:Type
        version:Type
        major:Type
    }
    cpu?:{
        architecture:Type
    }
    device?:{
        model?:Type
        type?:Type
        vendor?:Type
    }
    engine:{
        name:Type
        version:Type
    }
    os:{
        name:Type
        version:Type
    }
}


export interface BaseLocation {
    hostname:string
    href:string
    port?:string
    protocol:string
}

export type IssueSpecification<Type = null|RegExp|string> =
    RecursivePartial<Issue<Type>>
export type NativeErrorHandler = (
    errorMessage:Event|string,
    url?:string,
    lineNumber?:number,
    columnNumber?:number,
    error?:Error,
    ...additionalParameter:Array<unknown>
) => (false|undefined)
export type ErrorHandler =
    NativeErrorHandler &
    {
        additionalIssuesToIgnore:Array<IssueSpecification>
        callbackBackup:NativeErrorHandler
        failedHandler:(error:Error) => void
        issuesToIgnore:Array<IssueSpecification>
        issueToIgnoreHandler:(issue:Issue, issueToIgnore:IssueSpecification) =>
            void
        location:BaseLocation
        reported:Mapping<true>
        reportedHandler:(response:Response) => Promise<void>|void
        reportPath:string
    }
