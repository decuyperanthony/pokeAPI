import bcrypt from 'bcryptjs';

const comparePassword = (
  password: string,
  expected: string
): Promise<boolean> => {
  return bcrypt.compare(password, expected);
};

const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export { comparePassword, hashPassword };
