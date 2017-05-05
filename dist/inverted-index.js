'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint linebreak-style: ["error", "windows"]*/
/**
 * the inverted index class that creates indices from supplied JSON Array objects.
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
   * @return {boolean} the result of the validity check.
   */


  _createClass(InvertedIndex, [{
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

    /**
     * createIndex - creates indices from supplied JSON Array Object and stores it in a container.
     *
     * @param  {string} fileName    the name of the file to create index from
     * @param  {JSON} fileContent the file to create index from
     * @return {JSON}             the result of the created Array.
     */

  }, {
    key: 'createIndex',
    value: function createIndex(fileName, fileContent) {
      this.fileName = fileName;
      this.fileContent = fileContent;
      var token = '';
      var wordToken = {};
      if (this.checkIfArrayIsValid(fileContent) === true) {
        fileContent.forEach(function (fileCont) {
          token += fileCont.text + ' ';
        });
        token = token.replace(/[^a-zA-Z]/gi, ' ').toLowerCase().split(' ');
        var fileIndex = 0;
        fileContent.forEach(function (fileCont) {
          token.forEach(function (indToken) {
            if (!Object.prototype.hasOwnProperty.call(wordToken, indToken) && indToken !== '') {
              var searchResult = fileCont.text.toLowerCase().search(indToken);
              if (searchResult >= 0) {
                wordToken[indToken] = [fileIndex];
              }
            } else if (Object.prototype.hasOwnProperty.call(wordToken, indToken) && indToken !== '') {
              var _searchResult = fileCont.text.toLowerCase().search(indToken);
              if (_searchResult >= 0) {
                var alreadyIndex = wordToken[indToken];
                wordToken[indToken] = Array.from(new Set(alreadyIndex.concat([fileIndex])));
              }
            }
          });
          fileIndex += 1;
        });
      }
      // this.indexObject = wordToken;
      // return token;
      this.CreatedIndexObject[this.fileName] = wordToken;
      // return wordToken;
      var indexObject = this.CreatedIndexObject;
      return indexObject;
    }

    /**
     * validateIndex - validates the created index.
     *
     * @param  {JSON} data the index to br validated
     * @return {boolean}     the result of he validity test true means valid;
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
     * @return {array}       processed array
     */

  }, {
    key: 'resolveTerms',
    value: function resolveTerms(terms) {
      var searchTerms = [];
      if (terms.length === 1) {
        terms = terms[0];
      }
      terms.forEach(function (indTerm) {
        if (typeof indTerm === 'string' || typeof indTerm === 'number') {
          searchTerms.push(indTerm.toLowerCase());
        } else {
          if (indTerm.length === 'undefined') {
            throw new Error('Invalid search Term');
          }
          indTerm.forEach(function (indTermInArray) {
            searchTerms.push(indTermInArray.toLowerCase());
          });
        }
      });
      return searchTerms;
    }
    /**
     * search - searches thrugh the created index.
     *
     * @param  {JSON} base  the JSON object to search from
     * @param  {array} terms the search parameters
     * @return {object}      result of the branch
     */

  }, {
    key: 'search',
    value: function search(base, terms) {
      var searchIndexResult = [];
      terms.forEach(function (term) {
        if (Object.prototype.hasOwnProperty.call(base, term)) {
          searchIndexResult[term] = base[term];
        } else {
          searchIndexResult[term] = '-';
        }
      });
      return searchIndexResult;
    }

    /**
     * searchIndex - generates the search index from parameters
     *
     * @param  {array} index    the index to search from
     * @param  {string} fileName the name of the file to search from optional
     * @return {JSON}          search index
     */

  }, {
    key: 'searchIndex',
    value: function searchIndex(index, fileName) {
      for (var _len = arguments.length, terms = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        terms[_key - 2] = arguments[_key];
      }

      var searchIndexResults = '';
      var indexValidity = this.validateIndex(index);
      if (indexValidity) {
        if (arguments.length === 3) {
          var searchTerms = this.resolveTerms(terms);
          var searchBase = index[fileName];
          searchIndexResults = this.search(searchBase, searchTerms);
        } else {
          var _searchTerms = this.resolveTerms(fileName);
          var searchIndexResult = {};
          for (var book in index) {
            if (Object.prototype.hasOwnProperty.call(index, book)) {
              var _searchBase = index[book];
              var tempSearchResult = this.search(_searchBase, _searchTerms);
              searchIndexResult[book] = tempSearchResult;
            }
          }
          searchIndexResults = searchIndexResult;
        }
      }
      return searchIndexResults;
    }
  }]);

  return InvertedIndex;
}();

exports.default = InvertedIndex;