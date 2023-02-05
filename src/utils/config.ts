import * as dotenv from 'dotenv';
dotenv.config();

const APP_URL = process.env.APP_URL || 'http://127.0.0.1:5173';
const ENVIRONMENT = process.env.NODE_ENV || 'development';
const SECRET = process.env.SECRET || 'not_so_secret_4';
const MONGODB_ADDON_URI = process.env.MONGO_URL;

const CORS_ORIGIN_ALLOWED = [APP_URL];

export { CORS_ORIGIN_ALLOWED, ENVIRONMENT, SECRET, MONGODB_ADDON_URI };
