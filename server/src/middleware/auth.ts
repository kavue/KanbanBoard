import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header missing' });
    return; // Ensure the function exits after sending a response
  }

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    res.status(500).json({ message: 'Server configuration error: JWT_SECRET_KEY not set' });
    return; // Ensure the function exits after sending a response
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
      return; // Ensure the function exits after sending a response
    }

    // Add the user data to the request object
    req.user = decoded as JwtPayload;

    // Call the next middleware
    next();
  });
};
