import passport from 'passport';
import { Express } from 'express';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { SECRET } from '../utils/config.js';
import UserModel from '../models/user.js'; // load up the user model

export const passportMiddleware = (app: Express) => {
  const jwtStrategyOptions = {
    jwtFromRequest: (req) => req.cookies.jwt,
    secretOrKey: SECRET
  };

  passport.use(
    'user',
    new JwtStrategy(jwtStrategyOptions, async function (jwt, done) {
      try {
        const { _id } = jwt;
        const user = await UserModel.findById(_id);
        if (user) return done(null, user);
      } catch (e) {
        console.log('error passport', e);
      }
      return done(null, false);
    })
  );

  app.use(passport.initialize());
};
