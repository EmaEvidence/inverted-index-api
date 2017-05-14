import express from 'express';
import dotenv from 'dotenv';
import router from './src/route';

dotenv.config();
const app = express();
const NODE_ENV = process.env.NODE_ENV;
app.use('/', router);

if (NODE_ENV === 'PROD') {
  app.set('PORT', process.env.PORT_PROD);
} else if (NODE_ENV === 'DEV') {
  app.set('PORT', process.env.PORT_DEV);
} else {
  app.set('PORT', process.env.PORT_TEST);
}

const port = app.get('PORT');
const server = app.listen(process.env.PORT || port);

export default server;
