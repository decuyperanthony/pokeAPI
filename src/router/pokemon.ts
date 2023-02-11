import express from 'express';
import { getPokemons } from '../controllers/pokemon';
import passport from 'passport';
const router = express.Router();

router.get(
  '/pokemons',
  passport.authenticate('user', { session: false }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  getPokemons
);

export default router;
