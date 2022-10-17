import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export const jwtSign = (payload: Object): string => {
  return jwt.sign(payload, SECRET as string, {
    algorithm: 'HS256',
  });
};

export const jwtVerify = (token: string) => {
  return jwt.verify(token, SECRET as string, { algorithms: ['HS256'] });
};
