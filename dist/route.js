'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _invertedIndex = require('../src/inverted-index');

var _invertedIndex2 = _interopRequireDefault(_invertedIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var app = (0, _express2.default)();
var invertedIndex = new _invertedIndex2.default();
var upload = (0, _multer2.default)({ dest: 'fixtures/' });
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
var NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'PROD') {
  app.set('PORT', process.env.PORT_PROD);
} else if (NODE_ENV === 'DEV') {
  app.set('PORT', process.env.PORT_DEV);
} else {
  app.set('PORT', process.env.PORT_TEST);
}

app.post('/api/v0/create', upload.array('book'), function (req, res) {
  var files = req.files;
  files.forEach(function (file, fileIndex) {
    var bookName = file.originalname;
    var path = file.path;
    _fs2.default.readFile(path, 'utf8', function (err, data) {
      if (err) {
        res.send(err.message);
      }
      var processedData = JSON.parse(data);
      _fs2.default.unlink(path);
      try {
        var b = invertedIndex.createIndex(bookName, processedData);
        if (fileIndex === files.length - 1) {
          res.json(b);
        }
      } catch (err) {
        res.send(err.message);
      }
    });
  });
});

app.post('/api/v0/search', function (req, res) {
  var fileName = req.body.filename;
  var terms = req.body.terms;
  var index = invertedIndex.CreatedIndexObject;
  if (terms === '' || terms === []) {
    res.send('Please supply search terms');
  } else {
    if (fileName === '' || fileName === undefined) {
      var searchResult = invertedIndex.searchIndex(index, terms);
      res.send(searchResult);
    } else {
      var _searchResult = invertedIndex.searchIndex(index, fileName, terms);
      res.send(_searchResult);
    }
  }
});

var port = app.get('PORT');
app.listen(process.env.PORT || port);
console.log('server is running at port ' + port);

exports.default = app;