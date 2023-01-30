dotenv.config();
import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import router from './router/pokemon.js';

import { CORS_ORIGIN_ALLOWED } from './utils/config.js';

const app: Express = express();

const port = process.env.PORT || 3000;

// * MIDDLEWARES
app.use(
  cors({
    credentials: true,
    origin: CORS_ORIGIN_ALLOWED
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

// * ROUTER
app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at foobar http://localhost:${port}`);
});
