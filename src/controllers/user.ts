import { catchErrors } from '../utils/error';
import { z } from 'zod';

export const login = catchErrors(async (req, res, next) => {
  try {
    z.string().parse(req.body.password);
    z.string()
      .email()
      .parse((req.body.email || '').trim().toLowerCase());
  } catch (e) {
    // const error = new Error(`Invalid request in login: ${e}`);
    e.status = 400;
    return next(e);
  }
  const { email } = req.body;
  const { password } = req.body;

  // if (!password || !email) return res.status(400).send({ ok: false, error: 'Missing password' });
  // email = (email || '').trim().toLowerCase();

  // const user = await UserModel.findOne({ email });
  // if (!user)
  //   return res.status(403).send({
  //     ok: false,
  //     error: 'Email incorrect',
  //     code: EMAIL_OR_PASSWORD_INVALID
  //   });

  // const match = await comparePassword(password, user.password);
  // if (!match)
  //   return res.status(403).send({
  //     ok: false,
  //     error: 'Mot de passe incorrect',
  //     code: EMAIL_OR_PASSWORD_INVALID
  //   });

  // const token = jwt.sign({ _id: user._id }, config.SECRET, {
  //   expiresIn: JWT_MAX_AGE
  // });
  // res.cookie('jwt', token, cookieOptions());

  return res.status(200).send({ ok: true, user: true });
  // return res.status(200).send({ ok: true, token, user: user.userResponseModel() });
});
