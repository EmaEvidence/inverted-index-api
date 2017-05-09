import express from 'express';
import multer from 'multer';
import InvertedIndex from '../src/inverted-index';

const upload = multer({ dest: 'uploads/' });

const app = express();
const invertedIndex = new InvertedIndex();

app.post('/api/v0/createIndex', (req, res) => {
  // const a = req.single;
  // invertedIndex.createIndex();
  res.send('a');
});

app.post('/api/v0/searchindex', (req, res) => {
  /* invertedIndex.searchIndex();
  const searchResult = invertedIndex.searchIndex();
  res.json(searchResult); */
  res.send('me');
});

app.listen(3000);
