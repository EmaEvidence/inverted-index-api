import express from 'express';
import multer from 'multer';
import fs from 'fs';
import bodyParser from 'body-parser';
import InvertedIndex from '../src/inverted-index';

const router = express.Router();
const invertedIndex = new InvertedIndex();
const upload = multer({ dest: 'fixtures/' });
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


/**
 * API endpoint for creating index takes in a file from the server and returns
 * an index  of the file if it passes validity test.
 */
router.post('/api/v0/create', upload.array('book'), (req, res) => {
  if (req.files === undefined) {
    res.send('Please upload a file(JSON Array)');
  } else {
    const files = req.files;
    files.forEach((file, fileIndex) => {
      const bookName = file.originalname;
      const path = file.path;
      if (/\.json$/g.test(bookName) || file.size < 1000) {
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
      } else {
        fs.unlink(path);
        res.send('Invalid File or File to large');
      }
    });
  }
});

/**
 *  API endpoint for searching for terms in an index
 * takes in terms and the name of the file from which to server
 */
router.post('/api/v0/search', (req, res) => {
  const fileName = req.body.filename;
  const terms = req.body.terms;
  const index = invertedIndex.CreatedIndexObject;
  if (terms === undefined || terms === undefined) {
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

export default router;
