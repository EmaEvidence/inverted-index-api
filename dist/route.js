'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _invertedIndex = require('../src/inverted-index');

var _invertedIndex2 = _interopRequireDefault(_invertedIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var invertedIndex = new _invertedIndex2.default();
var upload = (0, _multer2.default)({ dest: 'fixtures/' });
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.post('/api/v0/create', upload.array('book'), function (req, res) {
  var files = req.files;
  files.forEach(function (file, fileIndex) {
    try {
      var bookName = file.originalname;
      var path = file.path;
      _fs2.default.readFile(path, 'utf8', function (err, data) {
        if (err) {
          res.send(err.message);
        }
        var processedData = JSON.parse(data);
        var b = invertedIndex.createIndex(bookName, processedData);
        if (fileIndex === files.length - 1) {
          res.json(b);
        }
      });
    } catch (e) {
      res.json(e);
    }
  });
});

app.post('/api/v0/search', function (req, res) {
  var index = req.body.index;
  var fileName = req.body.filename;
  var terms = req.body.terms;
  var searchResult = invertedIndex.searchIndex(index, fileName, terms);
  res.send(searchResult);
});

app.listen(3000);
console.log('server is running at port 3000...');