'use strict';
(function(o,p){'object'==typeof exports&&'object'==typeof module?module.exports=p():'function'==typeof define&&define.amd?define('errorreporter',[],p):'object'==typeof exports?exports.errorreporter=p():o.errorreporter=p()})(this,function(){return function(n){function o(q){if(p[q])return p[q].exports;var r=p[q]={i:q,l:!1,exports:{}};return n[q].call(r.exports,r,r.exports,o),r.l=!0,r.exports}var p={};return o.m=n,o.c=p,o.i=function(q){return q},o.d=function(q,r,s){o.o(q,r)||Object.defineProperty(q,r,{configurable:!1,enumerable:!0,get:s})},o.n=function(q){var r=q&&q.__esModule?function(){return q['default']}:function(){return q};return o.d(r,'a',r),r},o.o=function(q,r){return Object.prototype.hasOwnProperty.call(q,r)},o.p='',o(o.s=3)}([function(n,o,p){'use strict';(function(q,r){o.__esModule=!0;try{q.require('source-map-support/register')}catch(t){}const s=o.globalContext=function(){return'undefined'==typeof window?'undefined'==typeof r?q:'window'in r?r.window:r:window}();o.default=s.onerror=function(t,u,v,w,x){if(!s.location.protocol.startsWith('http'))return!1;s.onerror.reportPath||(s.onerror.reportPath='/__error_report__'),s.onerror.failedHandler||(s.onerror.failedHandler=function(y){'alert'in s&&s.alert(y)}),s.onerror.casesToIgnore||(s.onerror.casesToIgnore=[{browser:{name:'IE',major:/[56789]/}},{errorMessage:/Access is denied/},{errorMessage:/Das System kann auf die Datei nicht zugreifen/},{errorMessage:'Error loading script'},{errorMessage:/Permission denied to access property/},{errorMessage:/Für diesen Vorgang ist nicht genügend Speicher verfügbar/},{errorMessage:/Nicht genügend Arbeitsspeicher/},{errorMessage:/^NS_ERROR[A-Z_]*:.*/},{errorMessage:/^QuotaExceededError:/},{errorMessage:/^ReferenceError: "gapi" is not defined\..*/},{errorMessage:'Script error.'},{errorMessage:/SecurityError:/},{errorMessage:/TypeError: Expected argument of type object, but instead had type object/},{errorMessage:'TypeError: window.localStorage is null'},{errorMessage:/null is not an object \(evaluating 'window\.localStorage/},{errorMessage:/^uncaught exception: /},{errorMessage:/Uncaught SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied/},{errorMessage:/Unbekannter Fehler/},{errorMessage:/Zugriff verweigert/},{browser:{name:'IE',version:'11'},errorMessage:/Das System kann den angegebenen Pfad nicht finden/},{browser:{name:'IE'},errorMessage:/In den Microsoft-Interneterweiterungen ist ein interner Fehler aufgetreten/}]),s.onerror.caseToIgnoreHandler||(s.onerror.caseToIgnoreHandler=function(y,z){z.errorMessage||s.alert(`Your technology "${y.technologyDescription}" to `+`display this website isn't supported any more. Please `+'upgrade your browser engine.')}),s.onerror.reportedHandler||(s.onerror.reportedHandler=function(){});try{let y={technologyDescription:'Unclear'};s.UAParser&&(y=new s.UAParser().getResult(),y.technologyDescription=`${y.browser.name} ${y.browser.major}  (`+`${y.browser.version} | ${y.engine.name} `+`${y.engine.version}) | ${y.os.name} `+y.os.version,y.device&&y.device.model&&y.device.type&&y.device.vendor&&(y.technologyDescription+=` | ${y.device.model} ${y.device.type} `+y.device.vendor)),y.errorMessage=t;const z=function(C,D){if('[object Object]'===Object.prototype.toString.call(D)&&'[object Object]'===Object.prototype.toString.call(C)){for(const E in D)if(D.hasOwnProperty(E)&&!(E in C&&z(C[E],D[E])))return!1;return!0}return'[object RegExp]'===Object.prototype.toString.call(D)?D.test(`${C}`):D===C};for(const C of s.onerror.casesToIgnore)if(z(y,C))return s.onerror.caseToIgnoreHandler(y,C),!1;let A=s.JSON&&s.JSON.stringify?s.JSON.stringify:function(D){const E=function(G){return G=`${G}`,G.replace?G.replace(/(?:\r\n|\r|\n)/g,'\\n').replace(/\\?"/g,'\\"'):G};let F='{';for(const G in D)D.hasOwnProperty(G)&&('{'!=F&&(F+=','),F+=`"${G}":`,F+='boolean'==typeof D[G]||'number'==typeof D[G]&&/[0-9.]+/.test(''+D[G])||null===D[G]?`${D[G]}`:`"${E(D[G])}"`);return`${F}}`};const B=`${t}#${s.location.href}#${v}#`+w;if(!s.onerror.reported[B]){s.onerror.reported[B]=!0;const C=s.location.port?`:${s.location.port}`:'';s.fetch(`${s.location.protocol}//`+`${s.location.hostname}${C}`+s.onerror.reportPath,{headers:new s.Headers({'Content-type':'application/json'}),body:A({technologyDescription:y.technologyDescription,url:u,errorMessage:t,absoluteURL:s.window.location.href,lineNumber:v,columnNumber:w,userAgent:s.window.navigator.userAgent,stack:x&&x.stack}),method:'PUT'}).then(s.onerror.reportedHandler).catch(s.onerror.failedHandler)}}catch(y){s.onerror.failedHandler(y)}return!1},s.onerror.reported={}}).call(o,p(2)(n),p(1))},function(n){var p=function(){return this}();try{p=p||Function('return this')()||(1,eval)('this')}catch(q){'object'==typeof window&&(p=window)}n.exports=p},function(n){n.exports=function(p){return p.webpackPolyfill||(p.deprecate=function(){},p.paths=[],!p.children&&(p.children=[]),Object.defineProperty(p,'loaded',{enumerable:!0,get:function(){return p.l}}),Object.defineProperty(p,'id',{enumerable:!0,get:function(){return p.i}}),p.webpackPolyfill=1),p}},function(n,o,p){n.exports=p(0)}])});