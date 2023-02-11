import passport from 'passport';
import { Express } from 'express';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { SECRET } from '../utils/config';
import UserModel from '../models/user'; // load up the user model

export const passportMiddleware = (app: Express) => {
  const jwtStrategyOptions = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
