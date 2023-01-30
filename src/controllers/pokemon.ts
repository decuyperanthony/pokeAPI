import { Request, Response } from 'express';

import fetch from 'node-fetch';
import { catchErrors } from '../utils/error.js';

export const getAllPokemons = catchErrors(async (_req: Request, res: Response) => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const pokemons = await response.json();
  res.send({ ok: true, data: pokemons });
});
