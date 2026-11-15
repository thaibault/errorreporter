if(typeof window==='undefined'||window===null)var window=(typeof globalThis==='undefined'||globalThis===null)?{}:globalThis;/******/ (function() { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because 'output.globalObject' reads 'this'.
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BASE_ISSUE: function() { return /* binding */ BASE_ISSUE; },
/* harmony export */   BROWSER_ISSUE: function() { return /* binding */ BROWSER_ISSUE; },
/* harmony export */   determineGlobalContext: function() { return /* binding */ determineGlobalContext; },
/* harmony export */   errorHandler: function() { return /* binding */ _errorHandler; },
/* harmony export */   globalContext: function() { return /* binding */ globalContext; }
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var core_js_modules_es_iterator_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* module decorator */ module = __webpack_require__.hmd(module);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__, core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__, core_js_modules_es_iterator_filter_js__WEBPACK_IMPORTED_MODULE_2__, core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_3__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_async_dependencies_result__[0];
core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_async_dependencies_result__[1];
core_js_modules_es_iterator_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_async_dependencies_result__[2];
core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_async_dependencies_result__[3];
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module errorreporter *//* !
    region header
    [Project page](https://tsickert.com/errorreporter)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/var _ref;function _typeof(o){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function _createForOfIteratorHelper(e,t){var _n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!_n){if(Array.isArray(e)||(_n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){_n&&(e=_n);var o=0,F=function F(){};return{s:F,n:function n(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function e(r){throw r},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u,i=!0;return{s:function s(){_n=_n.call(e)},n:function n(){i=!0;var r=_n.next();return r.done?{done:!0}:{value:r.value,done:i=!1}},e:function e(r){a=!0,u=r},f:function f(){try{i||null==_n.return||_n.return()}finally{if(a)throw u}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(r){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(o),!0).forEach(function(t){_defineProperty(r,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))})}return r}function _defineProperty(r,t,o){return(t=_toPropertyKey(t))in r?Object.defineProperty(r,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[t]=o,r}function _toPropertyKey(r){var o=_toPrimitive(r,"string");return"symbol"==_typeof(o)?o:o+""}function _toPrimitive(t,e){if("object"!=_typeof(t)||!t)return t;var r;if("undefined"!=typeof Symbol&&void 0!==(r=t[Symbol.toPrimitive])){var i=r.call(t,e||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}var determineGlobalContext=function determineGlobalContext(){if(typeof globalThis==="undefined"){if(typeof window==="undefined"){if(typeof __webpack_require__.g==="undefined")return  false?0:module;if("window"in __webpack_require__.g)return __webpack_require__.g.window;return __webpack_require__.g}return window}return globalThis};var globalContext=determineGlobalContext();var _errorHandler=function errorHandler(errorMessage,url,lineNumber,columnNumber,error){var issue=_objectSpread({},BROWSER_ISSUE);var location=Object.prototype.hasOwnProperty.call(globalContext,"window")&&Object.prototype.hasOwnProperty.call(globalContext.window,"location")?globalContext.window.location:_errorHandler.location;/*
        Sends an error report to current requested domain via ajax in JSON
        format. Supported by Chrome 13+, Firefox 6.0+, Internet Explorer 5.5+,
        Opera 11.60+, Safari 5.1+
    */// URL to send error messages to.
if(!_errorHandler.reportPath)_errorHandler.reportPath="/__error_report__";// Handler to call if error reporting fails.
if(!Object.prototype.hasOwnProperty.call(_errorHandler,"failedHandler"))_errorHandler.failedHandler=function(error){if("alert"in globalContext)globalContext.alert(error)};// All issues which completely match will be ignored.
if(!Object.prototype.hasOwnProperty.call(_errorHandler,"issuesToIgnore"))_errorHandler.issuesToIgnore=[/* eslint-disable max-len */{browser:{name:"IE"}},{browser:{major:/^([1-9]|10)$/,name:"Firefox"}},{errorMessage:/Access is denied/},{errorMessage:/Das System kann auf die Datei nicht zugreifen/},{errorMessage:/Der RPC-Server ist nicht verfügbar/},{errorMessage:"Error loading script"},{errorMessage:/Für diesen Vorgang ist nicht genügend Speicher verfügbar/},{errorMessage:/^In den Microsoft-Interneterweiterungen ist ein interner Fehler aufgetreten\./},{errorMessage:/^IndexSizeError: Index or size is negative or greater than the allowed amount/},{errorMessage:/Nicht genügend Arbeitsspeicher/},{errorMessage:/^NS_ERROR[A-Z_]*:.*/},{errorMessage:/Permission denied to access property/},{errorMessage:/^QuotaExceededError:/},{errorMessage:/^ReferenceError: "gapi" is not defined\..*/},{errorMessage:"Script error."},{errorMessage:/^SecurityError/},{errorMessage:/TypeError: Expected argument of type object, but instead had type object/},{errorMessage:/^TypeError: undefined is not an object \(evaluating 'window\.__firefox__\..+'\)$/},{errorMessage:/Uncaught SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied/},{errorMessage:/Uncaught ReferenceError: ztePageScrollModule is not defined/},{errorMessage:"Unbekannter Fehler"},{errorMessage:"UnknownError"},{errorMessage:/^uncaught exception: /},{errorMessage:/Zugriff verweigert/}/* eslint-enable max-len */];/*
        NOTE: Do not write the merged list back to avoid adding additional
        issues again on each call.
    */var issuesToIgnore=Array.isArray(_errorHandler.additionalIssuesToIgnore)?_errorHandler.issuesToIgnore.concat(_errorHandler.additionalIssuesToIgnore):_errorHandler.issuesToIgnore;// Handler to call for browser which should be ignored.
if(!Object.prototype.hasOwnProperty.call(_errorHandler,"issueToIgnoreHandler"))_errorHandler.issueToIgnoreHandler=function(issue,issueToIgnore){/*
                We should avoid error message if a specific error message
                should be ignored.
            */if(!issueToIgnore.errorMessage)globalContext.alert("Your technology \"".concat(issue.technologyDescription,"\" to ")+"display this website isn't supported any more. Please "+"upgrade your browser engine.")};// Handler to call when error reporting was successful.
if(!Object.prototype.hasOwnProperty.call(_errorHandler,"reportedHandler"))_errorHandler.reportedHandler=function(){// Do nothing.
};try{// eslint-disable-next-line @typescript-eslint/no-base-to-string
issue.errorMessage=String(errorMessage)||"unknown";// Checks if given object completely matches given match object.
var _matches=function matches(issueItem,issueItemSpecification){if(Object.prototype.toString.call(issueItemSpecification)==="[object Object]"&&Object.prototype.toString.call(issueItem)==="[object Object]"){for(var _i=0,_Object$keys=Object.keys(issueItemSpecification);_i<_Object$keys.length;_i++){var key=_Object$keys[_i];if(!(issueItem[key]&&_matches(issueItem[key],issueItemSpecification[key])))return false}return true}if(Object.prototype.toString.call(issueItemSpecification)==="[object RegExp]")return issueItemSpecification.test(String(issueItem));return issueItemSpecification===issueItem};var _iterator=_createForOfIteratorHelper(issuesToIgnore),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var issueToIgnore=_step.value;if(_matches(issue,issueToIgnore)){_errorHandler.issueToIgnoreHandler(issue,issueToIgnore);return}}}catch(err){_iterator.e(err)}finally{_iterator.f()}var toString=function toString(value){if(typeof value==="number")// NOTE: JSON does not know "NaN" or "Infinity".
return isFinite(value)?String(value):"null";if(value===null||value===undefined)return"null";if(typeof value==="boolean")return String(value);return"\""+/* eslint-disable @typescript-eslint/no-base-to-string */String(value)/* eslint-enable @typescript-eslint/no-base-to-string */.replace(/\\/g,"\\\\").replace(/"/g,"\\\"").replace(/\r\n|\r|\n/g,"\\n").replace(/\t/g,"\\t")// eslint-disable-next-line no-control-regex
.replace(/[\u0000-\u001f]/g,function(character){return"\\u"+character.charCodeAt(0).toString(16).padStart(4,"0")})+"\""};var _serialize=function serialize(value){if(value!==null&&_typeof(value)==="object"&&!(value instanceof RegExp)){if(Array.isArray(value)){var _result="[";var _iterator2=_createForOfIteratorHelper(value),_step2;try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var item=_step2.value;if(_result!=="[")_result+=",";_result+=_serialize(item)}}catch(err){_iterator2.e(err)}finally{_iterator2.f()}return"".concat(_result,"]")}var result="{";for(var _i2=0,_Object$keys2=Object.keys(value);_i2<_Object$keys2.length;_i2++){var key=_Object$keys2[_i2];if(result!=="{")result+=",";result+="\"".concat(key,"\":")+_serialize(value[key])}return"".concat(result,"}")}return toString(value)};var errorKey="".concat(errorMessage,"#").concat(location.href,"#")+"".concat(String(lineNumber),"#").concat(String(columnNumber));if(!Object.prototype.hasOwnProperty.call(_errorHandler.reported,errorKey)){_errorHandler.reported[errorKey]=true;var portPrefix=location.port?":".concat(location.port):"";var headers={"Content-type":"application/json"};globalContext.fetch("".concat(location.protocol,"//").concat(location.hostname).concat(portPrefix)+_errorHandler.reportPath,{body:_serialize({absoluteURL:location.href,columnNumber:columnNumber,errorMessage:errorMessage,issuesToIgnore:issuesToIgnore,lineNumber:lineNumber,stack:error===null||error===void 0?void 0:error.stack,technologyDescription:issue.technologyDescription,url:url,userAgent:Object.prototype.hasOwnProperty.call(globalContext,"window")&&Object.prototype.hasOwnProperty.call(globalContext.window,"navigator")&&globalContext.window.navigator.userAgent?globalContext.window.navigator.userAgent:"unclear"}),headers:Object.prototype.hasOwnProperty.call(globalContext,"Headers")?new globalContext.Headers(headers):headers,method:"PUT"}).then(_errorHandler.reportedHandler).catch(function(error){_errorHandler.failedHandler(error)})}}catch(error){_errorHandler.failedHandler(error)}};_errorHandler.location={hostname:"localhost",href:"http://localhost",protocol:"http:"};/*
    Bound reported errors to globale error handler to avoid global variable
    pollution.
*/_errorHandler.reported={};var BASE_ISSUE={errorMessage:"",technologyDescription:"unknown",ua:"",engine:{name:"",version:""},os:{name:"",version:""}};var BROWSER_ISSUE=_objectSpread({},BASE_ISSUE);_errorHandler.UAParser=null;if(globalThis.UAParser)_errorHandler.UAParser=(_ref=globalThis.UAParser)!==null&&_ref!==void 0?_ref:null;if(_errorHandler.UAParser){var _errorHandler$UAParse=(new _errorHandler.UAParser).getResult(),browser=_errorHandler$UAParse.browser,engine=_errorHandler$UAParse.engine,os=_errorHandler$UAParse.os,ua=_errorHandler$UAParse.ua;BROWSER_ISSUE=_objectSpread(_objectSpread({},BROWSER_ISSUE),{},{browser:{name:browser.name||"",major:browser.major||"",version:browser.version||""},engine:{name:engine.name||"",version:engine.version||""},os:{name:os.name||"",version:os.version||""},ua:ua||""})}try{if(BROWSER_ISSUE.browser){var _BROWSER_ISSUE$device;BROWSER_ISSUE.technologyDescription="".concat(BROWSER_ISSUE.browser.name," ").concat(BROWSER_ISSUE.browser.major," (")+"".concat(BROWSER_ISSUE.browser.version," | ").concat(BROWSER_ISSUE.engine.name," ")+"".concat(BROWSER_ISSUE.engine.version,") | ").concat(BROWSER_ISSUE.os.name," ")+BROWSER_ISSUE.os.version;if((_BROWSER_ISSUE$device=BROWSER_ISSUE.device)!==null&&_BROWSER_ISSUE$device!==void 0&&_BROWSER_ISSUE$device.model&&BROWSER_ISSUE.device.type&&BROWSER_ISSUE.device.vendor)BROWSER_ISSUE.technologyDescription+=" | ".concat(BROWSER_ISSUE.device.model," ")+"".concat(BROWSER_ISSUE.device.type," ").concat(BROWSER_ISSUE.device.vendor)}}catch(error){console.warn(error)}/* harmony default export */ __webpack_exports__["default"] = (_errorHandler);// Register extended error handler globally.
if(globalContext.addEventListener){// Handling synchronous errors and general runtime errors
globalContext.addEventListener("error",function(event){_errorHandler(event.message,event.source,event.lineno,event.colno,event.error,event.filename)});// Intercepting unhandled promise rejections (async/await)
globalContext.addEventListener("unhandledrejection",function(event){var reason=event.reason;if(reason instanceof Error)_errorHandler(reason.message,undefined,undefined,undefined,reason);else _errorHandler(reason)})}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),
/* 1 */
/***/ (function(module) {

"use strict";
module.exports = import("core-js/modules/es.array.push.js");;

/***/ }),
/* 2 */
/***/ (function(module) {

"use strict";
module.exports = import("core-js/modules/es.iterator.constructor.js");;

/***/ }),
/* 3 */
/***/ (function(module) {

"use strict";
module.exports = import("core-js/modules/es.iterator.filter.js");;

/***/ }),
/* 4 */
/***/ (function(module) {

"use strict";
module.exports = import("core-js/modules/es.iterator.for-each.js");;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	!function() {
/******/ 		var hasSymbol = typeof Symbol === "function";
/******/ 		var webpackQueues = hasSymbol ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = hasSymbol ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = hasSymbol ? Symbol("webpack error") : "__webpack_error__";
/******/ 		
/******/ 		var resolveQueue = function(queue) {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach(function(fn) { fn.r--; });
/******/ 				queue.forEach(function(fn) { fn.r-- ? fn.r++ : fn(); });
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = function(deps) { return deps.map(function(dep) {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 		
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then(function(r) {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, function(e) {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 		
/******/ 					obj[webpackQueues] = function(fn) { fn(queue); };
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = function() {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}); };
/******/ 		__webpack_require__.a = function(module, body, hasAwait) {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise(function(resolve, rej) {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = function(fn) { queue && fn(queue), depQueues.forEach(fn), promise["catch"](function() {}); };
/******/ 			module.exports = promise;
/******/ 			var handle = function(deps) {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = function() { return currentDeps.map(function(d) {
/******/ 		
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}); }
/******/ 				var promise = new Promise(function(resolve) {
/******/ 					fn = function() { resolve(getResult); };
/******/ 					fn.r = 0;
/******/ 					var fnQueue = function(q) { q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))); };
/******/ 					currentDeps.forEach(function(dep) { dep[webpackQueues](fnQueue); });
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}
/******/ 			var done = function(err) { (err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue); }
/******/ 		
/******/ 			body(handle, done);
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = function(exports, definition) {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	__webpack_require__.hmd = function(module) {
/******/ 		module = Object.create(module);
/******/ 		if (!module.children) module.children = [];
/******/ 		Object.defineProperty(module, 'exports', {
/******/ 			enumerable: true,
/******/ 			set: function() {
/******/ 				throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 			}
/******/ 		});
/******/ 		return module;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); };
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	window.errorreporter = __webpack_exports__;
/******/ 	
/******/ })()
;