import express, { Express } from 'express';
// import './lib/db.js';
import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { passportMiddleware } from './middlewares/passport';
import pokemonRouter from './router/pokemon';
import userRouter from './router/user';

import { CORS_ORIGIN_ALLOWED, MONGODB_ADDON_URI } from './utils/config';

dotenv.config();
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
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

app.use(morgan('dev'));

// * PASSPORT
passportMiddleware(app);

// * ROUTER
app.use(userRouter);
app.use(pokemonRouter);

// == mongoo
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_ADDON_URI as string);
const database = mongoose.connection;

database.on(
  'error',
  console.error.bind(console, '❌ mongodb connection error')
);
database.once('open', () => console.log('✅ mongodb connected successfully'));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
