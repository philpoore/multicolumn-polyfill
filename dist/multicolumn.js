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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/multicolumn.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/multicolumn.js":
/*!****************************!*\
  !*** ./src/multicolumn.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n* CSS3 multicolumn polyfill for list elements for IE\n* Distributes items evenly to floating elements (regardless of heights)\n*\n* usage example:\n*  if (!Modernizr.csscolumns) {\n*    $('.mycolumn-element').multicolumn();\n*  }\n*\n* v0.1\n* July 2013\n* Tobias Schmidt <tobias.schmidt@seitenbau.com>\n*/\n\nconst pluginName = 'multicolumn';\nconst defaults = {\n    columnGap : 15, //is converted into percent in relative mode\n    columnCount: 'auto',\n    wrapperClass : 'column-wrapper',\n    hiddenClass : 'mc-hidden',\n    mode: 'relative',\n    childSelector: false\n};\n\nfunction Plugin( element, options ) {\n    this.jse = element;\n    this.element   = $(element);\n    this.options   = $.extend( {}, defaults, options );\n    this._defaults = defaults;\n    this._name     = pluginName;\n    this.init();\n}\n\nPlugin.prototype = {\n\n    init : function() {\n        this.doColumns();\n        this.setResizeHandler();\n    },\n\n    doColumns : function($el) {\n        var self = this;\n        var $vel = typeof $el == 'undefined' ? this.element : $el;\n\n        $vel.each(function() {\n            var $el = $(this);\n\n            // get column Count\n            var columnCount;\n            if(self.options.columnCount === 'auto') {\n                columnCount = $el.css('column-count') ? $el.css('column-count') : $el[0].currentStyle.getAttribute('column-count'); //IE\n            } else {\n                columnCount = self.options.columnCount;\n            }\n\n            // check columns\n            if(!columnCount || columnCount < 2) {\n                self.destroy($el);\n                return;\n            }\n\n            var gapWidth = self.options.columnGap,\n            tagName = $el.prop('tagName'),\n            classes = $el.attr('class'),\n            listMarginLeft = $el.css('margin-left'),\n            listMarginRight = $el.css('margin-right'),\n            listMarginBottom = $el.css('margin-bottom'),\n            listMarginTop = $el.css('margin-top'),\n            listPaddingRight = $el.css('padding-right'),\n            listPaddingLeft = $el.css('padding-left'),\n            listPaddingBottom = $el.css('padding-bottom'),\n            listPaddingTop = $el.css('padding-top'),\n            $children = $el.children(self.options.childSelector);\n\n            // calculate vars\n            var perColumnItemCount  = Math.ceil( $children.length / columnCount ),\n            containerWidth = $el.parent().outerWidth() - (parseInt(listPaddingLeft, 10) + parseInt(listPaddingRight,10)),\n            columnWidth = (containerWidth - (gapWidth * (columnCount - 1))) / columnCount;\n\n            if(self.options.mode == 'relative') {\n                columnWidth = (columnWidth / containerWidth * 100) + '%';\n                gapWidth = (gapWidth / containerWidth * 100) + '%';\n            } else {\n                containerWidth = Math.floor(containerWidth);\n                columnWidth = Math.floor(columnWidth);\n            }\n\n\n            // define wrapper element\n            var $wrapper = $('<div class=\"clearfix ' + self.options.wrapperClass + '\"></div>')\n            .css({\n                'margin-left': listMarginLeft,\n                'margin-right': listMarginRight,\n                'margin-top': listMarginTop,\n                'margin-bottom': listMarginBottom,\n                'padding-right' : listPaddingRight,\n                'padding-left' : listPaddingLeft,\n                'padding-top' : listPaddingTop,\n                'padding-bottom' : listPaddingBottom\n            });\n\n            // get wrapper element\n            var $lists = $wrapper.clone();\n\n            // fill each column with list elements\n            for (var i = 0; i < columnCount; i++) {\n                var columnMargin = i > 0 ? gapWidth : 0;\n                var $listItems = $children.clone(true);\n                var fromCount = parseInt((perColumnItemCount * i), 10);\n                var toCount = parseInt((fromCount + perColumnItemCount), 10);\n                $listItems = $listItems.slice(fromCount, toCount);\n\n                var $list = $('<' + tagName + '/>')\n                .css({\n                    'display': 'block',\n                    'float': 'left',\n                    'width': columnWidth,\n                    'margin-right': 0,\n                    'margin-left': columnMargin,\n                    'padding' : 0\n                })\n                .attr('class', classes);\n\n                //wrap $lists with wrapper and uls\n                $lists.append($list.append($listItems));\n            };\n\n            //insert new element, remove old\n            $el.after($lists).hide().addClass(self.options.hiddenClass);\n\n            /* FIX if there are memory leaks: cleanup the\n            * cleanup element && eventhandlers\n            * Note: I this case you cannot get the element back\n            $el.remove();\n            */\n        });\n    },\n\n    setResizeHandler : function() {\n        var self = this;\n        $(window).on('orientationchange pageshow resize', self.waitForFinalEvent(function(e) {\n            var _self = self;\n            self.element.each(function() {\n                var $el = $(this);\n                _self.destroy($el, _self.bind(_self.doColumns, [$el], _self));\n            });\n        })).trigger('resize');\n    },\n\n    waitForFinalEvent : function (func, timeout) {\n        var timeoutID , timeout = timeout || 400;\n        return function () {\n            var scope = this , args = arguments;\n            clearTimeout(timeoutID);\n            timeoutID = setTimeout( function () {\n                func.apply( scope , Array.prototype.slice.call( args ) );\n            } , timeout );\n        }\n    },\n\n    destroy : function ($el, callback) {\n        $el.show().removeClass(this.options.hiddenClass);\n        $el.next('.' + this.options.wrapperClass).remove();\n\n        if (typeof callback == 'function') {\n            callback.call();\n        }\n    },\n\n    bind : function(fn, args, scope) {\n        return function () {\n            fn.apply(scope, args);\n        };\n    }\n\n};\n\n$.fn[pluginName] = function ( options ) {\n    return this.each(function () {\n        $.data(this, \"plugin_\" + pluginName, new Plugin( this, options ));\n    });\n};\n\n\n//# sourceURL=webpack:///./src/multicolumn.js?");

/***/ })

/******/ });