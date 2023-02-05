import { NextFunction, Request, Response } from 'express';

import fetch from 'node-fetch';
import { catchErrors } from '../utils/error.js';

const POKEAPI_URL = 'https://pokeapi.co/api/v2';

export type Pokemon = {
  name: string;
  url: string;
};

type ResPokeAPI = {
  count: number;
  previous: string | null;
  next: string | null;
  results: ReadonlyArray<Pokemon>;
};

export const getPokemons = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { limit, offset } = req.query;
    try {
      const response = await fetch(
        `${POKEAPI_URL}/pokemon?limit=${limit}&offset=${offset}`
      );

      const pokemonsBasic = await response.json();

      const promises = await (pokemonsBasic as ResPokeAPI).results.map(
        async ({ url }) => {
          const res = await fetch(url);
          const pokemon = await res.json();
          return pokemon;
        }
      );

      let results;
      await Promise.all(promises).then(function (_results) {
        results = _results;
      });

      const data = {
        ...(pokemonsBasic as ResPokeAPI),
        results
      };

      res.status(200).send({ ok: true, data });
    } catch (e) {
      const error = new Error(`Invalid request for pokemons: ${e}`);
      res.status(400);
      return next(error);
    }
  }
);
