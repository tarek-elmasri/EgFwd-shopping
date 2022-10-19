import { Response, Request, NextFunction } from 'express';
import { jwtVerify } from '../utils/jwt_tokens';

/**
 * middleware extracts headers authorization
 * and verifying jwt token provided
 */
const authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) throw new Error();
    jwtVerify(token);
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticated;
