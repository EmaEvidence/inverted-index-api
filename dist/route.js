'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _invertedIndex = require('../dist/inverted-index');

var _invertedIndex2 = _interopRequireDefault(_invertedIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var invertedIndex = new _invertedIndex2.default();

app.post('/api/v0/create', function (req, res) {
  invertedIndex.createIndex();
  res.json('users');
});

app.post('/api/v0/search', function (req, res) {
  invertedIndex.searchIndex();
  var searchResult = invertedIndex.searchIndex();
  res.json(searchResult);
});

app.listen(3000);