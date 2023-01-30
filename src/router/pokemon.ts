import express from 'express';
import { getAllPokemons } from '../controllers/pokemon.js';

const router = express.Router();

router.get('/pokemons', getAllPokemons);

export default router;
