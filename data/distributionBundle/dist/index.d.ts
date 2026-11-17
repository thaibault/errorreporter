import type { ErrorHandler, Issue } from './type';
export declare const determineGlobalContext: (() => typeof globalThis);
export declare const globalContext: typeof globalThis;
export declare const errorHandler: ErrorHandler;
export declare const BASE_ISSUE: Issue;
export declare let BROWSER_ISSUE: Issue;
export default errorHandler;
