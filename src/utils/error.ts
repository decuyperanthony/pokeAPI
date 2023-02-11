/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction } from 'express';
// @ts-ignore
export const catchErrors = (fn) => {
  return function (req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    return fn(req, res, next).catch(next);
  };
};
