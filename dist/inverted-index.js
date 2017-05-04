'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * inverted-index class
 */
var InvertedIndex = function () {

  /**
   * constructor - description
   *
   * @param  {string} fileName    the name of uploaded file
   * @param  {object} fileContent JSON array
   * @return {type}             description
   */
  function InvertedIndex(fileName, fileContent) {
    _classCallCheck(this, InvertedIndex);

    this.fileName = fileName;
    this.fileContent = fileContent;
    this.indexObject = {};
  }

  /**
   * checkIfArrayIsValid - checks the validity of the supplied JSON array;
   *
   * @param  {object} data the file to be tested
   * @return {boolean}      the result of the test
   */


  _createClass(InvertedIndex, [{
    key: 'checkIfArrayIsValid',
    value: function checkIfArrayIsValid(data) {
      var result = '';
      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        if (data.length === undefined && data[0] === undefined) {
          result = false;
          // throw new Error('An Invalid JSON Array');
        } else if (data.length === 0) {
          result = false;
          // throw new Error('Book is Empty');
        } else {
          data.forEach(function (file) {
            var fileTitleType = _typeof(file.title);
            var fileTitle = file.title;
            var fileTextType = _typeof(file.text);
            var fileText = file.text;
            if (fileTitleType !== 'string' || fileTitle === ' ' || fileTextType !== 'string' || fileText === ' ') {
              result = 'false';
              // throw new Error('File is malformed');
            } else {
              result = true;
            }
          });
        }
      } else {
        result = false;
        // throw new Error('Not an Object');
      }
      return result;
    }

    /**
     * createIndex - creates an index from the supplied JSON array
     *
     * @return {object}  description
     */

  }, {
    key: 'createIndex',
    value: function createIndex() {
      var file = this.fileContent;
      var token = '';
      var wordToken = {};
      if (this.checkIfArrayIsValid(file) === true) {
        file.forEach(function (indFile) {
          token += indFile.text + ' ';
        });
        token = token.replace(/[^a-zA-Z]/gi, ' ').toLowerCase().split(' ');
        var fileIndex = 0;
        file.forEach(function (indFile) {
          token.forEach(function (indToken) {
            if (!Object.prototype.hasOwnProperty.call(wordToken, indToken) && indToken !== '') {
              var searchResult = indFile.text.toLowerCase().search(indToken);
              if (searchResult >= 0) {
                wordToken[indToken] = [fileIndex];
              }
            } else if (Object.prototype.hasOwnProperty.call(wordToken, indToken) && indToken !== '') {
              var _searchResult = file.text.toLowerCase().search(indToken);
              if (_searchResult >= 0) {
                var alreadyIndex = wordToken[indToken];
                wordToken[indToken] = Array.from(new Set(alreadyIndex.concat([fileIndex])));
              }
            }
          });
          fileIndex += 1;
        });
      }
      this.indexObject = wordToken;
      return wordToken;
    }

    /**
     * searchIndex - searches for the presence of supplied term(s) in the created index.
     *
     * @param  {object} index    index created by createIndex method.
     * @param  {string} fileName optional the name of file to search from.
     * @param  {array} terms words to search for
     * @return {object}          result of the search.
     */

  }, {
    key: 'searchIndex',
    value: function searchIndex(index, fileName) {
      var _this = this;

      this.index = this.indexObject;
      this.fileName = fileName;
      var searchTerms = [];
      var searchIndexResult = {};

      for (var _len = arguments.length, terms = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        terms[_key - 2] = arguments[_key];
      }

      terms.forEach(function (indTerm) {
        if (typeof indTerm === 'string') {
          searchTerms.push(indTerm);
        } else {
          if (typeof indTerm === 'number' || indTerm.length === 'undefined') {
            throw new Error('Invalid search Term');
          }
          indTerm.forEach(function (indTermInArray) {
            searchTerms.push(indTermInArray);
          });
        }
      });
      searchTerms.forEach(function (term) {
        if (Object.prototype.hasOwnProperty.call(_this.index, term)) {
          searchIndexResult[term] = _this.index[term];
        } else {
          searchIndexResult[term] = '-';
        }
      });
      return searchIndexResult;
    }
  }]);

  return InvertedIndex;
}();

exports.default = InvertedIndex;