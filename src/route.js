import express from 'express';
import multer from 'multer';
import InvertedIndex from '../dist/inverted-index';

const app = express();
const invertedIndex = new InvertedIndex();

app.post('/api/v0/create', (req, res) => {
  invertedIndex.createIndex();
  res.json('users');
});

app.post('/api/v0/search', (req, res) => {
  invertedIndex.searchIndex();
  const searchResult = invertedIndex.searchIndex();
  res.json(searchResult);
});

app.listen(3000);
