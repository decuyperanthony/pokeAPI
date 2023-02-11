import express from 'express';
import passport from 'passport';

import { login, logout, signup, signinToken } from '../controllers/user';

const router = express.Router();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.post('/login', login);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.post('/signup', signup);
router.get(
  '/signin-token',
  passport.authenticate('user', { session: false }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  signinToken
);
router.post(
  '/logout',
  passport.authenticate('user', { session: false }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  logout
);

export default router;
