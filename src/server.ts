dotenv.config();
import express, { Express } from 'express';
import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { passportMiddleware } from './middlewares/passport.js';
import pokemonRouter from './router/pokemon.js';
import userRouter from './router/user.js';

import { CORS_ORIGIN_ALLOWED, MONGODB_ADDON_URI } from './utils/config.js';

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
mongoose.connect(MONGODB_ADDON_URI);

app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at foobar http://localhost:${port}`
  );
});
