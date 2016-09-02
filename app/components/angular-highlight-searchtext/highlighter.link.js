let highlighterLink = function (scope, element) {
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
                }
                else {
                    _processedCode = '<pre>' + hljs.highlight(_language, _code).value + '</pre>';
                }
                _searchTextArray = _searchText.replace(/[^\w\s]/gi, ' ').split(' ');

                for (var i = 0; i < _searchTextArray.length; i++) {
                    if (_searchTextArray[i]) {
                        _re = new RegExp(_searchTextArray[i] + "(?=[^<>]*(?:<\\w|<\/[^a]|$))", "ig");
                        if (_processedCode.search(_re) > 0) {
                            _searchIndex = _processedCode.search(_re);
                            _txt_replace = '<b class="textHighlight">' + _processedCode.substring(_searchIndex, _searchIndex + _searchTextArray[i].length) + '</b>';
                            _processedCode = _processedCode.replace(_re, _txt_replace)
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
                codeLineString += '<span class="line-number">'+(i + 1)+ '</span>' + codeLineArray[i] + '\n';
            }
            return codeLineString;
        }
    })(hljs);


}
export default highlighterLink;
