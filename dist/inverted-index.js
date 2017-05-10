'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint linebreak-style: ["error", "windows"]*/
/**
 *  inverted index class that creates indices from supplied JSON Array objects.
 */
var InvertedIndex = function () {
  /**
   * constructor - creates containers for datas created in the class to be stored and accessed.
   *
   * @return {type}  empty containers, empty objects
   */
  function InvertedIndex() {
    _classCallCheck(this, InvertedIndex);

    this.fileName = '';
    this.fileContent = '';
    this.CreatedIndexObject = {};
    this.searchIndexResult = {};
  }

  /**
   * checkIfArrayIsValid - checks the validity of the JSON Array supplied to the class.
   *
   * @param  {object} data the JSON array
   * @return {boolean} result of the validity check.
   */


  _createClass(InvertedIndex, [{
    key: 'createIndex',


    /**
     * createIndex - creates indices from supplied JSON Array Object and stores it in a container.
     *
     * @param  {string} fileName    the name of the file to create index from
     * @param  {JSON} fileContent the file to create index from
     * @return {JSON}  indexObject   the result of the created Array.
     */
    value: function createIndex(fileName, fileContent) {
      this.fileName = fileName;
      this.fileContent = fileContent;
      var token = '';
      var wordToken = {};
      if (InvertedIndex.checkIfArrayIsValid(fileContent) === true) {
        fileContent.forEach(function (individualFileContent) {
          token += individualFileContent.text + ' ';
        });
        token = token.replace(/[^a-zA-Z]/gi, ' ').toLowerCase().split(' ');
        fileContent.forEach(function (individualFileContent, index) {
          token.forEach(function (word) {
            if (!Object.prototype.hasOwnProperty.call(wordToken, word) && word !== '') {
              var result = individualFileContent.text.toLowerCase().search(word);
              if (result >= 0) {
                wordToken[word] = [index];
              }
            } else if (Object.prototype.hasOwnProperty.call(wordToken, word) && word !== '') {
              var _result = individualFileContent.text.toLowerCase().search(word);
              if (_result >= 0) {
                var alreadyIndex = wordToken[word];
                wordToken[word] = Array.from(new Set(alreadyIndex.concat([index])));
              }
            }
          });
        });
      }
      this.CreatedIndexObject[this.fileName] = wordToken;
      var indexObject = this.CreatedIndexObject;
      return indexObject;
    }

    /**
     * validateIndex - validates the created index.
     *
     * @param  {JSON} data the index to br validated
     * @return {boolean} result  the result of he validity test true means valid;
     */

  }, {
    key: 'validateIndex',
    value: function validateIndex(data) {
      if (!data) {
        data = this.CreatedIndexObject;
      }
      var result = true;
      for (var book in data) {
        if (Object.prototype.hasOwnProperty.call(data, book)) {
          for (var token in data[book]) {
            if (Object.prototype.hasOwnProperty.call(data[book], token)) {
              result = Array.isArray(data[book][token]);
              if (result === false) {
                return false;
              }
            }
          }
        }
        return result;
      }
    }
    /**
     * resolveTerms -Processes the parameters to be sought for in the created Index
     *
     * @param  {array} terms the supplied search parameters
     * @return {array} searchTerms  processed array
     */

  }, {
    key: 'searchIndex',


    /**
     * searchIndex - generates the search result from supplied parameters
     *
     * @param  {array} index    the index to search from
     * @param  {string} fileName the name of the file to search from optional
     * @return {JSON} searchIndexResults  search index
     */
    value: function searchIndex(index, fileName) {
      for (var _len = arguments.length, terms = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        terms[_key - 2] = arguments[_key];
      }

      var searchIndexResults = '';
      var indexValidity = this.validateIndex(index);
      if (indexValidity) {
        if (arguments.length === 3) {
          var searchTerms = InvertedIndex.resolveTerms(terms);
          var searchBase = index[fileName];
          searchIndexResults = InvertedIndex.search(searchBase, searchTerms);
        } else if (/\.json$/g.test(fileName)) {
          var _searchTerms = InvertedIndex.resolveTerms(terms);
          var searchIndexResult = {};
          for (var book in index) {
            if (Object.prototype.hasOwnProperty.call(index, book)) {
              var _searchBase = index[book];
              var tempSearchResult = InvertedIndex.search(_searchBase, _searchTerms);
              searchIndexResult[book] = tempSearchResult;
            }
          }
          searchIndexResults = searchIndexResult;
        } else {
          terms.push(fileName);
          var _searchTerms2 = InvertedIndex.resolveTerms(terms);
          var _searchIndexResult = {};
          for (var _book in index) {
            if (Object.prototype.hasOwnProperty.call(index, _book)) {
              var _searchBase2 = index[_book];
              var _tempSearchResult = InvertedIndex.search(_searchBase2, _searchTerms2);
              _searchIndexResult[_book] = _tempSearchResult;
            }
          }
          searchIndexResults = _searchIndexResult;
        }
      } else {
        throw new Error('Invalid Index');
      }
      return searchIndexResults;
    }
  }], [{
    key: 'checkIfArrayIsValid',
    value: function checkIfArrayIsValid(data) {
      var result = '';
      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        if (data.length === undefined && data[0] === undefined) {
          result = false;
          throw new Error('Invalid JSON Array');
        } else {
          if (data.length === 0) {
            result = false;
            throw new Error('Book is Empty');
          } else {
            data.forEach(function (file) {
              var fileTitleType = _typeof(file.title);
              var fileTitle = file.title;
              var fileTextType = _typeof(file.text);
              var fileText = file.text;
              if (fileTitleType !== 'string' || fileTitle === ' ' || fileTextType !== 'string' || fileText === ' ') {
                throw new Error('File is malformed');
              } else {
                result = true;
              }
            });
          }
        }
      } else {
        result = false;
        throw new Error('Invalid JSON Array');
      }
      return result;
    }
  }, {
    key: 'resolveTerms',
    value: function resolveTerms(terms) {
      var searchTerms = [];
      if (terms.length === 1) {
        if (typeof terms[0] === 'string') {
          searchTerms = terms[0].replace(/[^a-zA-Z]/gi, ' ').toLowerCase().split(' ');
          return searchTerms;
        } else if (Array.isArray(terms[0])) {
          var _ref;

          terms = terms[0];
          searchTerms = (_ref = []).concat.apply(_ref, [[]].concat(_toConsumableArray(terms)));
        }
      } else {
        var _ref2;

        searchTerms = (_ref2 = []).concat.apply(_ref2, [[]].concat(_toConsumableArray(terms)));
      }
      return searchTerms;
    }
    /**
     * search - searches thrugh the created index.
     *
     * @param  {JSON} base  the JSON object to search from
     * @param  {array} terms the search parameters
     * @return {object} searchIndexResult result of the branch
     */

  }, {
    key: 'search',
    value: function search(base, terms) {
      var searchIndexResult = {};
      terms.forEach(function (term) {
        if (Object.prototype.hasOwnProperty.call(base, term)) {
          searchIndexResult[term] = base[term];
        } else {
          searchIndexResult[term] = '';
        }
      });
      return searchIndexResult;
    }

    /**
     * validateTerms - checks the supplied search terms for error
     *
     * @param  {array} terms data to be validated
     * @return {boolean} result the result of thr validity check
     */

  }, {
    key: 'validateTerms',
    value: function validateTerms(terms) {
      var result = true;
      if (!Array.isArray(terms)) {
        result = false;
      } else if (terms.length === 0) {
        result = false;
      } else {
        result = true;
      }
      return result;
    }
  }]);

  return InvertedIndex;
}();

exports.default = InvertedIndex;