import express from 'express';
import passport from 'passport';

import { login, logout, signup } from '../controllers/user.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post(
  '/logout',
  passport.authenticate('user', { session: false }),
  logout
);

export default router;
