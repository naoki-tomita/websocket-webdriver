/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/client/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/client/index.ts":
/*!*************************************!*\
  !*** ./src/scripts/client/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Types_1 = __webpack_require__(/*! ../common/Types */ \"./src/scripts/common/Types.ts\");\nvar ws = new WebSocket(\"ws://\" + location.hostname + \":8081\");\nws.addEventListener(\"open\", function () {\n    // ws.send(\"CONNECTED\");\n});\nws.addEventListener(\"close\", function () {\n});\nws.addEventListener(\"error\", function () {\n});\nws.addEventListener(\"message\", function (data) {\n    var message = parseMessage(data.data);\n    var result = procMessage(message);\n    ws.send(JSON.stringify(result));\n});\nfunction parseMessage(message) {\n    try {\n        var parsedData = JSON.parse(message);\n        var type = parsedData.type, data = parsedData.data, additionalData = parsedData.additionalData;\n        switch (type) {\n            case Types_1.MessageType.EVAL:\n                return {\n                    type: type,\n                    data: data,\n                    additionalData: additionalData,\n                };\n            case Types_1.MessageType.ELEMENT:\n                return {\n                    type: type,\n                    data: data,\n                };\n            default:\n                return {\n                    type: Types_1.MessageType.UNKNOWN,\n                };\n        }\n    }\n    catch (e) {\n        return {\n            type: Types_1.MessageType.UNKNOWN,\n        };\n    }\n}\nfunction procMessage(message) {\n    switch (message.type) {\n        case Types_1.MessageType.EVAL:\n            return execFunction(message.data, message.additionalData);\n        case Types_1.MessageType.ELEMENT:\n            return findElement(message.data);\n        default:\n            return;\n    }\n}\nfunction execFunction(func, params) {\n    return new Function(func).apply(window, params);\n}\nfunction findElement(selector) {\n    var el = document.querySelector(selector);\n    return {\n        id: el.id,\n        classNames: el.className.split(\" \"),\n        tag: el.tagName.toLowerCase(),\n        html: el.innerHTML,\n    };\n}\n\n\n//# sourceURL=webpack:///./src/scripts/client/index.ts?");

/***/ }),

/***/ "./src/scripts/common/Types.ts":
/*!*************************************!*\
  !*** ./src/scripts/common/Types.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar MessageType;\n(function (MessageType) {\n    MessageType[\"EVAL\"] = \"eval\";\n    MessageType[\"ELEMENT\"] = \"element\";\n    MessageType[\"UNKNOWN\"] = \"unknown\";\n})(MessageType = exports.MessageType || (exports.MessageType = {}));\n\n\n//# sourceURL=webpack:///./src/scripts/common/Types.ts?");

/***/ })

/******/ });