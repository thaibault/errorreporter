'use strict';
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory((function webpackLoadOptionalExternalModule() { try { return require("ua-parser-js"); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define("errorreporter", ["ua-parser-js"], factory);
	else if(typeof exports === 'object')
		exports["errorreporter"] = factory((function webpackLoadOptionalExternalModule() { try { return require("ua-parser-js"); } catch(e) {} }()));
	else
		root['errorreporter'] = factory(root["ua-parser-js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, global) {exports.__esModule=!0;try{module.require('source-map-support/register')}catch(a){}let clientData={};const globalContext=exports.globalContext=function(){return'undefined'==typeof window?'undefined'==typeof global? false?{}:module:'window'in global?global.window:global:window}(),onErrorCallbackBackup=globalContext.onerror;exports.default=globalContext.onerror=function(a,b,c,d,e,...f){if(!globalContext.location.protocol.startsWith('http'))return globalContext.onerror.callbackBackup(a,b,c,d,e,...f);globalContext.onerror.reportPath||(globalContext.onerror.reportPath='/__error_report__'),globalContext.onerror.failedHandler||(globalContext.onerror.failedHandler=function(a){'alert'in globalContext&&globalContext.alert(a)}),globalContext.onerror.casesToIgnore||(globalContext.onerror.casesToIgnore=[{browser:{name:'IE',major:/[56789]/}},{browser:{name:'Firefox',major:/[123456789]|10/}},{errorMessage:/Access is denied/},{errorMessage:/Das System kann auf die Datei nicht zugreifen/},{errorMessage:/Der RPC-Server ist nicht verfügbar/},{errorMessage:'Error loading script'},{errorMessage:/Für diesen Vorgang ist nicht genügend Speicher verfügbar/},{errorMessage:/^In den Microsoft-Interneterweiterungen ist ein interner Fehler aufgetreten\./},{errorMessage:/^IndexSizeError: Index or size is negative or greater than the allowed amount/},{errorMessage:/Nicht genügend Arbeitsspeicher/},{errorMessage:/^NS_ERROR[A-Z_]*:.*/},{errorMessage:/null is not an object \(evaluating 'window\.localStorage/},{errorMessage:/Permission denied to access property/},{errorMessage:/^QuotaExceededError:/},{errorMessage:/^ReferenceError: "gapi" is not defined\..*/},{errorMessage:'Script error.'},{errorMessage:/^SecurityError/},{errorMessage:/TypeError: Expected argument of type object, but instead had type object/},{errorMessage:'TypeError: window.localStorage is null'},{errorMessage:'Uncaught ReferenceError: androidInterface is not defined'},{errorMessage:/Uncaught SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied/},{errorMessage:/Uncaught ReferenceError: ztePageScrollModule is not defined/},{errorMessage:'Unbekannter Fehler'},{errorMessage:'UnknownError'},{errorMessage:/^uncaught exception: /},{errorMessage:/Zugriff verweigert/},{browser:{name:'IE',version:'11'},errorMessage:/Das System kann den angegebenen Pfad nicht finden/}]),globalContext.onerror.caseToIgnoreHandler||(globalContext.onerror.caseToIgnoreHandler=function(a,b){b.errorMessage||globalContext.alert(`Your technology "${a.technologyDescription}" to `+`display this website isn't supported any more. Please `+'upgrade your browser engine.')}),globalContext.onerror.reportedHandler||(globalContext.onerror.reportedHandler=function(){});try{clientData.technologyDescription='Unclear',clientData.hasOwnProperty('browser')&&(clientData.technologyDescription=`${clientData.browser.name} ${clientData.browser.major} (`+`${clientData.browser.version} | ${clientData.engine.name} `+`${clientData.engine.version}) | ${clientData.os.name} `+clientData.os.version,clientData.device&&clientData.device.model&&clientData.device.type&&clientData.device.vendor&&(clientData.technologyDescription+=` | ${clientData.device.model} ${clientData.device.type}`+` ${clientData.device.vendor}`)),clientData.errorMessage=a;const g=function(a,b){if('[object Object]'===Object.prototype.toString.call(b)&&'[object Object]'===Object.prototype.toString.call(a)){for(const c in b)if(b.hasOwnProperty(c)&&!(c in a&&g(a[c],b[c])))return!1;return!0}return'[object RegExp]'===Object.prototype.toString.call(b)?b.test(`${a}`):b===a};for(const h of globalContext.onerror.casesToIgnore)if(g(clientData,h))return globalContext.onerror.caseToIgnoreHandler(clientData,h),globalContext.onerror.callbackBackup(a,b,c,d,e,...f);const h=function(a){return['boolean','number'].includes(typeof a)||null===a?`${a}`:'"'+`${a}`.replace(/\\/g,'\\\\').replace(/(?:\r\n|\r)/g,'\\n').replace(/"/g,'\\"')+'"'},i=function(a){if('object'==typeof a&&null!==a&&!(a instanceof RegExp)){if(Array.isArray(a)){let b='[';for(const c of a)'['!=b&&(b+=','),b+=i(c);return`${b}]`}let b='{';for(const c in a)a.hasOwnProperty(c)&&('{'!=b&&(b+=','),b+=`"${c}":${i(a[c])}`);return`${b}}`}return`${h(a)}`},j=`${a}#${globalContext.location.href}#${c}#`+d;if(!globalContext.onerror.reported[j]){globalContext.onerror.reported[j]=!0;const f=globalContext.location.port?`:${globalContext.location.port}`:'';globalContext.fetch(`${globalContext.location.protocol}//`+`${globalContext.location.hostname}${f}`+globalContext.onerror.reportPath,{headers:new globalContext.Headers({"Content-type":'application/json'}),body:i({absoluteURL:globalContext.window.location.href,casesToIgnore:globalContext.onerror.casesToIgnore,columnNumber:d,errorMessage:a,lineNumber:c,stack:e&&e.stack,technologyDescription:clientData.technologyDescription,url:b,userAgent:globalContext.window.navigator.userAgent}),method:'PUT'}).then(globalContext.onerror.reportedHandler).catch(globalContext.onerror.failedHandler)}}catch(a){globalContext.onerror.failedHandler(a)}return globalContext.onerror.callbackBackup(a,b,c,d,e,...f)},globalContext.onerror.callbackBackup=onErrorCallbackBackup?onErrorCallbackBackup.bind(globalContext):function(){return!1},globalContext.onerror.reported={};try{clientData=__webpack_require__(4)()}catch(a){}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module), __webpack_require__(3)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

if(typeof __WEBPACK_EXTERNAL_MODULE_4__ === 'undefined') {var e = new Error("Cannot find module \"ua-parser-js\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ })
/******/ ]);
});