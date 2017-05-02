import express from 'express';

const app = express();
const users = ['John', 'Betty', 'Hal'];

app.post('/api/create', (req, res) => {
  res.json(users);
});

app.post('/api/search', (req, res) => {
  res.json('users');
});

module.exports = app;
