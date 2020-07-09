// #!/usr/bin/env node
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
export type Issue = {
    errorMessage:string;

    technologyDescription:string;
    ua:string;

    browser?:{
        name:string;
        version:string;
        major:string;
    };
    cpu?:{
        architecture:string;
    };
    device?:{
        model?:string;
        type?:string;
        vendor?:string;
    };
    engine:{
        name:string;
        version:string;
    };
    os:{
        name:string;
        version:string;
    };
}
export type IssueSpecification<Type = null|RegExp|string> = {
    errorMessage?:Type;

    technologyDescription?:Type;
    ua?:Type;

    browser?:{
        name?:Type;
        version?:Type;
        major?:Type;
    };
    cpu?:{
        architecture?:Type;
    };
    device?:{
        model?:Type;
        type?:Type;
        vendor?:Type;
    };
    engine?:{
        name?:Type;
        version?:Type;
    };
    os?:{
        name?:Type;
        version?:Type;
    };
}
export type NativeErrorHandler = (
    errorMessage:Event|string,
    url?:string,
    lineNumber?:number,
    columnNumber?:number,
    error?:Error,
    ...additionalParameter:Array<any>
) => (false|void)
export type ErrorHandler = NativeErrorHandler & {
    additionalIssuesToIgnore:Array<IssueSpecification>;
    callbackBackup:NativeErrorHandler;
    issuesToIgnore:Array<IssueSpecification>;
    issueToIgnoreHandler:(issue:Issue, issueToIgnore:IssueSpecification) =>
        void;
    failedHandler:(error:Error) => void;
    reported:{[key:string]:true};
    reportedHandler:(response:Response) => Promise<void>|void;
    reportPath:string;
}
