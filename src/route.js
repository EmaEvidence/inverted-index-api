import express from 'express';
import multer from 'multer';
import fs from 'fs';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import InvertedIndex from '../src/inverted-index';

dotenv.config();
const app = express();
const invertedIndex = new InvertedIndex();
const upload = multer({ dest: 'fixtures/' });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'PROD') {
  app.set('PORT', process.env.PORT_PROD);
} else if (NODE_ENV === 'DEV') {
  app.set('PORT', process.env.PORT_DEV);
} else {
  app.set('PORT', process.env.PORT_TEST);
}

app.post('/api/v0/create', upload.array('book'), (req, res) => {
  const files = req.files;
  files.forEach((file, fileIndex) => {
    const bookName = file.originalname;
    const path = file.path;
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        res.send(err.message);
      }
      const processedData = JSON.parse(data);
      fs.unlink(path);
      try {
        const b = invertedIndex.createIndex(bookName, processedData);
        if (fileIndex === files.length - 1) {
          res.json(b);
        }
      } catch (err) {
        res.send(err.message);
      }
    });
  });
});

app.post('/api/v0/search', (req, res) => {
  const fileName = req.body.filename;
  const terms = req.body.terms;
  const index = invertedIndex.CreatedIndexObject;
  if (terms === '' || terms === []) {
    res.send('Please supply search terms');
  } else {
    if (fileName === '' || fileName === undefined) {
      const searchResult = invertedIndex.searchIndex(index, terms);
      res.send(searchResult);
    } else {
      const searchResult = invertedIndex.searchIndex(index, fileName, terms);
      res.send(searchResult);
    }
  }
});

const port = app.get('PORT');
const server = app.listen(process.env.PORT || port);
console.log(`server is running at port ${port}`);

export default server;
