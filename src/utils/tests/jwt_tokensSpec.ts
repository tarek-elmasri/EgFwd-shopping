import { JwtPayload } from 'jsonwebtoken';
import { jwtSign, jwtVerify } from '../jwt_tokens';

describe('jwt_tokens utils tests', () => {
  const payload = { id: 1, name: 'tarek' };
  let token: string;
  it('jwtSign to sign payload and return a token', () => {
    token = jwtSign(payload);

    expect(token.split('.').length).toBe(3);
  });

  it('jwtVerify to verify token', () => {
    expect((jwtVerify(token) as JwtPayload).id).toBe(payload.id);
    expect((jwtVerify(token) as JwtPayload).name).toBe(payload.name);
  });

  it('jwtVerify to throw error with invalid token', () => {
    const invalidToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.frdRRWfsuZ0H6nOXsDCI8NxnLyhOgsSDRAG0tAfIABk';
    expect(() => jwtVerify(invalidToken)).toThrowError();
  });
});
