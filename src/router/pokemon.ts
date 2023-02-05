import express from 'express';
import { getPokemons } from '../controllers/pokemon.js';
import passport from 'passport';
const router = express.Router();

router.get(
  '/pokemons',
  passport.authenticate('user', { session: false }),
  getPokemons
);

export default router;
