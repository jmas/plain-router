(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("plain-router", [], factory);
	else if(typeof exports === 'object')
		exports["plain-router"] = factory();
	else
		root["plain-router"] = factory();
})(this, function() {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["onHashChange"] = onHashChange;
class Router {
    constructor(routes) {
        this._routes = routes;
    }

    dispatch(uri) {
        const normalizedUri = (uri ? uri : '/').replace(/^#/, '');
        const routes = this._routes;
        const routesNames = Object.keys(routes);
        for (let i = 0; i < routesNames.length; i++) {
            const routeName = routesNames[i];
            const routePattern = routes[routeName];
            const normalizedRoutePattern = routePattern.replace('\/', '\\/').replace(/\:[^\/]+/, () => '([^\/]+)');
            const routeRegEx = new RegExp('^' + normalizedRoutePattern + '(?:\/|)$');
            let matches = null;
            if (matches = normalizedUri.match(routeRegEx)) {
                const paramsHolders = routePattern.match(/\:([^\/]+)/g);
                if (paramsHolders) {
                    const params = paramsHolders.reduce((accum, paramHolder, i) => {
                        accum[paramHolder.substring(1)] = matches[i + 1];
                        return accum;
                    }, {});
                    return {
                        uri: normalizedUri,
                        routeName,
                        params
                    };
                }
                return {
                    uri: normalizedUri,
                    routeName,
                    params: null
                };
            }
        }
        return {
            uri: normalizedUri,
            routeName: null,
            params: null
        };
    }

    uriFor(routeName, params = {}) {
        const routes = this._routes;
        const routePattern = routes[routeName];
        if (!routePattern) {
            throw new Error(`Route with name '${routeName}' is not found.`);
        }
        const paramsHolders = routePattern.match(/\:([^\/]+)/g);
        if (!paramsHolders) {
            return routePattern;
        }
        let uri = routePattern;
        for (let i = 0; i < paramsHolders.length; i++) {
            const holderName = paramsHolders[i].substring(1);
            if (!params[holderName]) {
                throw new Error(`Require param with name '${holderName}'.`);
            }
            uri = uri.replace(paramsHolders[i], params[holderName]);
        }
        return uri;
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Router;


function onHashChange(router, handler, dispatchImmediately = true) {
    window.addEventListener('hashchange', () => {
        handler(router.dispatch(window.location.hash));
    }, false);
    if (dispatchImmediately) {
        handler(router.dispatch(window.location.hash));
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
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
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Router__ = __webpack_require__(0);


module.exports = __WEBPACK_IMPORTED_MODULE_0__Router__;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)(module)))

/***/ })
/******/ ]);
});