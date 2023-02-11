import mongoose from 'mongoose';
import { MONGODB_ADDON_URI } from '../utils/config';

if (!process.env.MONGO_URL) {
  throw new Error('Please add the MONGO_URL environment variable');
}

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_ADDON_URI as string);

const database = mongoose.connection;

database.on(
  'error',
  console.error.bind(console, '❌ mongodb connection error')
);
database.once('open', () => console.log('✅ mongodb connected successfully'));

mongoose.Promise = Promise;
