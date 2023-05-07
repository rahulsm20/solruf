import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = 'your_secret_key';

interface User {
  id: number;
  email: string;
}

declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  }

  interface AuthenticatedUser extends JwtPayload {
    id: number;
    email: string;
  }
  
const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secret) as AuthenticatedUser;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}

export default auth;
