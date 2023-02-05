import bcrypt from 'bcryptjs';

const comparePassword = (password: string, expected: string): boolean => {
  return bcrypt.compare(password, expected);
};

const hashPassword = (password: string): string => {
  return bcrypt.hash(password, 10);
};

export { comparePassword, hashPassword };
