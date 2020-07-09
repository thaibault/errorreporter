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
export type Issue<Type=string> = {
    errorMessage:Type;

    technologyDescription:Type;
    ua?:Type;

    browser?:{
        name:Type;
        version:Type;
        major:Type;
    };
    cpu?:{
        architecture:Type;
    };
    device?:{
        model:Type;
        type:Type;
        vendor:Type;
    };
    engine?:{
        name:Type;
        version:Type;
    };
    os?:{
        name:Type;
        version:Type;
    };
}
export type IssueSpecification = Issue<null|RegExp|string|undefined>
export type PlainErrorHandler = (
    errorMessage:string,
    url:string,
    lineNumber:number,
    columnNumber:number,
    error:Error,
    ...additionalParameter:Array<any>
) => (false|void)
export type ErrorHandler = PlainErrorHandler & {
    additionalIssuesToIgnore:Array<IssueSpecification>;
    callbackBackup:PlainErrorHandler;
    issuesToIgnore:Array<IssueSpecification>;
    failedHandler:(error:Error) => void;
    reported:{[key:string]:true};
    reportedHandler:(response:Response) => Promise<void>|void;
    reportPath:string;
}
