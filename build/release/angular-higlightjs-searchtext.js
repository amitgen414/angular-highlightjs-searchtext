(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highlighter = require('./highlighter.html');

var _highlighter2 = _interopRequireDefault(_highlighter);

var _highlighter3 = require('./highlighter.link');

var _highlighter4 = _interopRequireDefault(_highlighter3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var highlighterComponent = function highlighterComponent() {
  return {
    restrict: 'E',
    scope: {
      code: '=',
      language: '=',
      searchtext: '=',
      linenumber: '='

    },
    link: _highlighter4.default,
    template: _highlighter2.default
  };
};

exports.default = highlighterComponent;

},{"./highlighter.html":2,"./highlighter.link":4}],2:[function(require,module,exports){
module.exports = "";

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highlighter = require('./highlighter.component');

var _highlighter2 = _interopRequireDefault(_highlighter);

var _highlighter3 = require('./highlighter.service');

var _highlighter4 = _interopRequireDefault(_highlighter3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NetworkGraphModule = angular.module('hljsSearch', []).directive('hljsSearch', _highlighter2.default).service('configHljs', _highlighter4.default);

exports.default = NetworkGraphModule;

},{"./highlighter.component":1,"./highlighter.service":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var highlighterLink = function highlighterLink(scope, element) {
    var _element = angular.element(element[0]);
    var _searchText;
    var _language;
    var _lineNumber;
    var _code;
    var _re = null;
    var _searchTextArray;
    var _markUp, _processedCode, _txt_replace, _searchIndex;

    (function (hljs) {

        scope.$watch('code', function (newVal) {
            _code = newVal || ' ';
            codeProcessor();
        });
        scope.$watch('searchtext', function (newVal) {
            _searchText = newVal || ' ';
            codeProcessor();
        });
        scope.$watch('language', function (newVal) {
            _language = newVal;
            codeProcessor();
        });
        scope.$watch('linenumber', function (newVal) {
            _lineNumber = newVal || false;
            codeProcessor();
        });

        function codeProcessor() {
            if (_code && _searchText && _language) {
                if (_lineNumber) {
                    _processedCode = '<pre>' + lineGenerator(_code) + '</pre>';
                } else {
                    _processedCode = '<pre>' + hljs.highlight(_language, _code).value + '</pre>';
                }
                _searchTextArray = _searchText.replace(/[^\w\s]/gi, ' ').split(' ');

                for (var i = 0; i < _searchTextArray.length; i++) {
                    if (_searchTextArray[i]) {
                        _re = new RegExp(_searchTextArray[i] + "(?=[^<>]*(?:<\\w|<\/[^a]|$))", "ig");
                        if (_processedCode.search(_re) > 0) {
                            _searchIndex = _processedCode.search(_re);
                            _txt_replace = '<b class="textHighlight">' + _processedCode.substring(_searchIndex, _searchIndex + _searchTextArray[i].length) + '</b>';
                            _processedCode = _processedCode.replace(_re, _txt_replace);
                        }
                    }
                }
                _markUp = '<code class="hljs ' + _language + '">' + _processedCode + '</code>';
                _element.html(_markUp);
            }
        }

        function lineGenerator(code) {
            var codeLineArray = hljs.highlight(_language, code).value.split('\n');
            var codeLineString = '';
            for (var i = 0; i < codeLineArray.length; i++) {
                codeLineString += '<span class="line-number">' + (i + 1) + '</span>' + codeLineArray[i] + '\n';
            }
            return codeLineString;
        }
    })(hljs);
};
exports.default = highlighterLink;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by AmitKumarJha on 8/31/2016.
 */
var highlighterService = function highlighterService() {};

exports.default = highlighterService;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGNvbXBvbmVudHNcXGFuZ3VsYXItaGlnaGxpZ2h0LXNlYXJjaHRleHRcXGhpZ2hsaWdodGVyLmNvbXBvbmVudC5qcyIsImFwcC9jb21wb25lbnRzL2FuZ3VsYXItaGlnaGxpZ2h0LXNlYXJjaHRleHQvaGlnaGxpZ2h0ZXIuaHRtbCIsImFwcFxcY29tcG9uZW50c1xcYW5ndWxhci1oaWdobGlnaHQtc2VhcmNodGV4dFxcaGlnaGxpZ2h0ZXIuanMiLCJhcHBcXGNvbXBvbmVudHNcXGFuZ3VsYXItaGlnaGxpZ2h0LXNlYXJjaHRleHRcXGhpZ2hsaWdodGVyLmxpbmsuanMiLCJhcHBcXGNvbXBvbmVudHNcXGFuZ3VsYXItaGlnaGxpZ2h0LXNlYXJjaHRleHRcXGhpZ2hsaWdodGVyLnNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLHVCQUF1QixTQUF2QixvQkFBdUIsR0FBWTtBQUNyQyxTQUFPO0FBQ0wsY0FBVSxHQURMO0FBRUwsV0FBTztBQUNMLFlBQUssR0FEQTtBQUVMLGdCQUFTLEdBRko7QUFHTCxrQkFBVyxHQUhOO0FBSUwsa0JBQVc7O0FBSk4sS0FGRjtBQVNMLCtCQVRLO0FBVUw7QUFWSyxHQUFQO0FBWUQsQ0FiRDs7a0JBZWUsb0I7OztBQ2xCZjtBQUNBOzs7Ozs7OztBQ0RBOzs7O0FBQ0E7Ozs7OztBQUdBLElBQUkscUJBQXFCLFFBQVEsTUFBUixDQUFlLFlBQWYsRUFBNkIsRUFBN0IsRUFHeEIsU0FId0IsQ0FHZCxZQUhjLHlCQUl4QixPQUp3QixDQUloQixZQUpnQix3QkFBekI7O2tCQU1lLGtCOzs7Ozs7OztBQ1ZmLElBQUksa0JBQWtCLFNBQWxCLGVBQWtCLENBQVUsS0FBVixFQUFpQixPQUFqQixFQUEwQjtBQUM1QyxRQUFJLFdBQVcsUUFBUSxPQUFSLENBQWdCLFFBQVEsQ0FB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LCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9oaWdobGlnaHRlci5odG1sJztcbmltcG9ydCBsaW5rIGZyb20gJy4vaGlnaGxpZ2h0ZXIubGluayc7XG5cbmxldCBoaWdobGlnaHRlckNvbXBvbmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBjb2RlOic9JyxcbiAgICAgIGxhbmd1YWdlOic9JyxcbiAgICAgIHNlYXJjaHRleHQ6Jz0nLFxuICAgICAgbGluZW51bWJlcjonPSdcblxuICAgIH0sXG4gICAgbGluazogbGluayxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGlnaGxpZ2h0ZXJDb21wb25lbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiXCI7XG4iLCJpbXBvcnQgaGxqc1NlYXJjaFRleHRDb21wb25lbnQgZnJvbSAnLi9oaWdobGlnaHRlci5jb21wb25lbnQnO1xuaW1wb3J0IGhsanNTZWFyY2hDb25maWdTZXJ2aWNlIGZyb20gJy4vaGlnaGxpZ2h0ZXIuc2VydmljZSc7XG5cblxubGV0IE5ldHdvcmtHcmFwaE1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdobGpzU2VhcmNoJywgW1xuXSlcblxuLmRpcmVjdGl2ZSgnaGxqc1NlYXJjaCcsIGhsanNTZWFyY2hUZXh0Q29tcG9uZW50KVxuLnNlcnZpY2UoJ2NvbmZpZ0hsanMnLCBobGpzU2VhcmNoQ29uZmlnU2VydmljZSk7XG5cbmV4cG9ydCBkZWZhdWx0IE5ldHdvcmtHcmFwaE1vZHVsZTtcbiIsImxldCBoaWdobGlnaHRlckxpbmsgPSBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQpIHtcbiAgICB2YXIgX2VsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXSk7XG4gICAgdmFyIF9zZWFyY2hUZXh0O1xuICAgIHZhciBfbGFuZ3VhZ2U7XG4gICAgdmFyIF9saW5lTnVtYmVyO1xuICAgIHZhciBfY29kZTtcbiAgICB2YXIgX3JlID0gbnVsbDtcbiAgICB2YXIgX3NlYXJjaFRleHRBcnJheTtcbiAgICB2YXIgX21hcmtVcCwgX3Byb2Nlc3NlZENvZGUsIF90eHRfcmVwbGFjZSwgX3NlYXJjaEluZGV4O1xuXG4gICAgKGZ1bmN0aW9uIChobGpzKSB7XG5cbiAgICAgICAgc2NvcGUuJHdhdGNoKCdjb2RlJywgZnVuY3Rpb24gKG5ld1ZhbCkge1xuICAgICAgICAgICAgX2NvZGUgPSBuZXdWYWwgfHwgJyAnO1xuICAgICAgICAgICAgY29kZVByb2Nlc3NvcigpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdzZWFyY2h0ZXh0JywgZnVuY3Rpb24gKG5ld1ZhbCkge1xuICAgICAgICAgICAgX3NlYXJjaFRleHQgPSBuZXdWYWwgfHwgJyAnO1xuICAgICAgICAgICAgY29kZVByb2Nlc3NvcigpO1xuXG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2xhbmd1YWdlJywgZnVuY3Rpb24gKG5ld1ZhbCkge1xuICAgICAgICAgICAgX2xhbmd1YWdlID0gbmV3VmFsO1xuICAgICAgICAgICAgY29kZVByb2Nlc3NvcigpO1xuXG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kd2F0Y2goJ2xpbmVudW1iZXInLCBmdW5jdGlvbiAobmV3VmFsKSB7XG4gICAgICAgICAgICBfbGluZU51bWJlciA9IG5ld1ZhbCB8fCBmYWxzZTtcbiAgICAgICAgICAgIGNvZGVQcm9jZXNzb3IoKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBjb2RlUHJvY2Vzc29yKCkge1xuICAgICAgICAgICAgaWYgKF9jb2RlICYmIF9zZWFyY2hUZXh0ICYmIF9sYW5ndWFnZSkge1xuICAgICAgICAgICAgICAgIGlmIChfbGluZU51bWJlcikge1xuICAgICAgICAgICAgICAgICAgICBfcHJvY2Vzc2VkQ29kZSA9ICc8cHJlPicgKyBsaW5lR2VuZXJhdG9yKF9jb2RlKSArICc8L3ByZT4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3Byb2Nlc3NlZENvZGUgPSAnPHByZT4nICsgaGxqcy5oaWdobGlnaHQoX2xhbmd1YWdlLCBfY29kZSkudmFsdWUgKyAnPC9wcmU+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3NlYXJjaFRleHRBcnJheSA9IF9zZWFyY2hUZXh0LnJlcGxhY2UoL1teXFx3XFxzXS9naSwgJyAnKS5zcGxpdCgnICcpO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfc2VhcmNoVGV4dEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfc2VhcmNoVGV4dEFycmF5W2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfcmUgPSBuZXcgUmVnRXhwKF9zZWFyY2hUZXh0QXJyYXlbaV0gKyBcIig/PVtePD5dKig/OjxcXFxcd3w8XFwvW15hXXwkKSlcIiwgXCJpZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfcHJvY2Vzc2VkQ29kZS5zZWFyY2goX3JlKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VhcmNoSW5kZXggPSBfcHJvY2Vzc2VkQ29kZS5zZWFyY2goX3JlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdHh0X3JlcGxhY2UgPSAnPGIgY2xhc3M9XCJ0ZXh0SGlnaGxpZ2h0XCI+JyArIF9wcm9jZXNzZWRDb2RlLnN1YnN0cmluZyhfc2VhcmNoSW5kZXgsIF9zZWFyY2hJbmRleCArIF9zZWFyY2hUZXh0QXJyYXlbaV0ubGVuZ3RoKSArICc8L2I+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcHJvY2Vzc2VkQ29kZSA9IF9wcm9jZXNzZWRDb2RlLnJlcGxhY2UoX3JlLCBfdHh0X3JlcGxhY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX21hcmtVcCA9ICc8Y29kZSBjbGFzcz1cImhsanMgJyArIF9sYW5ndWFnZSArICdcIj4nICsgX3Byb2Nlc3NlZENvZGUgKyAnPC9jb2RlPic7XG4gICAgICAgICAgICAgICAgX2VsZW1lbnQuaHRtbChfbWFya1VwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGxpbmVHZW5lcmF0b3IoY29kZSkge1xuICAgICAgICAgICAgdmFyIGNvZGVMaW5lQXJyYXkgPSBobGpzLmhpZ2hsaWdodChfbGFuZ3VhZ2UsIGNvZGUpLnZhbHVlLnNwbGl0KCdcXG4nKTtcbiAgICAgICAgICAgIHZhciBjb2RlTGluZVN0cmluZyA9ICcnO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlTGluZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29kZUxpbmVTdHJpbmcgKz0gJzxzcGFuIGNsYXNzPVwibGluZS1udW1iZXJcIj4nKyhpICsgMSkrICc8L3NwYW4+JyArIGNvZGVMaW5lQXJyYXlbaV0gKyAnXFxuJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb2RlTGluZVN0cmluZztcbiAgICAgICAgfVxuICAgIH0pKGhsanMpO1xuXG5cbn1cbmV4cG9ydCBkZWZhdWx0IGhpZ2hsaWdodGVyTGluaztcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFtaXRLdW1hckpoYSBvbiA4LzMxLzIwMTYuXHJcbiAqL1xyXG5sZXQgaGlnaGxpZ2h0ZXJTZXJ2aWNlID0gZnVuY3Rpb24oKXtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhpZ2hsaWdodGVyU2VydmljZTsiXX0=
