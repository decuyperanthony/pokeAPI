import { CookieOptions, NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import UserModel from '../models/user.js';

import { catchErrors } from '../utils/error.js';
import { comparePassword } from '../utils/auth.js';
import { ENVIRONMENT, SECRET } from '../utils/config.js';

const EMAIL_OR_PASSWORD_INVALID = 'EMAIL_OR_PASSWORD_INVALID';
const JWT_MAX_AGE = 60 * 60 * 3; // 3 hours in s
const COOKIE_MAX_AGE = JWT_MAX_AGE * 1000;

const cookieOptions = (): CookieOptions => {
  if (ENVIRONMENT === 'development') {
    return {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    };
  } else {
    return {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    };
  }
};

const logoutCookieOptions = (): CookieOptions => {
  if (ENVIRONMENT === 'development') {
    return { httpOnly: true, secure: true, sameSite: 'none' };
  } else {
    return {
      httpOnly: true,
      secure: true,
      // todo use real prod domain
      domain: 'https://studio-ambiant.com/',
      sameSite: 'lax'
    };
  }
};

export const login = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      z.string().parse(req.body.password);
      z.string()
        .email()
        .parse((req.body.email || '').trim().toLowerCase());
    } catch (e) {
      const error = new Error(`Invalid request in login: ${e}`);
      res.status(400);
      return next(error);
    }
    const { email: mail, password } = req.body;

    if (!password || !mail)
      return res.status(400).send({ ok: false, error: 'Missing password' });
    const email = (mail || '').trim().toLowerCase();

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(403).send({
        ok: false,
        error: 'Email incorrect',
        code: EMAIL_OR_PASSWORD_INVALID
      });

    const match = await comparePassword(password, user.password);
    if (!match)
      return res.status(403).send({
        ok: false,
        error: 'Mot de passe incorrect',
        code: EMAIL_OR_PASSWORD_INVALID
      });

    const token = jwt.sign({ _id: user._id }, SECRET, {
      expiresIn: JWT_MAX_AGE
    });

    res.cookie('jwt', token, cookieOptions());

    return res
      .status(200)
      .send({ ok: true, token, user: user.userResponseModel() });
  }
);

export const logout = catchErrors(async (_req: Request, res: Response) => {
  res.clearCookie('jwt', logoutCookieOptions());
  return res.status(200).send({ ok: true });
});

export const signup = catchErrors(async (req, res, next) => {
  try {
    z.string().email().parse(req.body.email);
    z.string().min(1).parse(req.body.password);
    z.string().min(1).parse(req.body.confirmPassword);
  } catch (e) {
    const error = new Error(`Invalid request in user signup: ${e}`);
    res.status(400);
    return next(error);
  }

  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return res
      .status(400)
      .send({ ok: false, error: 'Les mots de passe ne sont pas identiques' });

  const newUser = {
    _id: new mongoose.Types.ObjectId(),
    email: email.trim().toLowerCase(),
    password
  };

  const prevUser = await UserModel.findOne({ email: newUser.email });
  if (prevUser)
    return res.status(400).send({
      ok: false,
      error: 'Un utilisateur existe déja avec cet email'
    });

  const user = await UserModel.create(newUser);

  const token = jwt.sign({ _id: user._id }, SECRET, {
    expiresIn: JWT_MAX_AGE
  });
  res.cookie('jwt', token, cookieOptions());

  return res.status(200).send({
    ok: true,
    user: user.userResponseModel()
  });
});
