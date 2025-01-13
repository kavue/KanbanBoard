import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  // Check if the Authorization header exists
  const authHeader = req.headers.authorization; 

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error('JWT_SECRET_KEY is not defined');
    }
    
    // Verify the token using jwt.verify()
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      // Attach the user to the request object
      req.user = user as JwtPayload;
      return next();
    })
  } else {
    res.status(401).json({ message: 'Authorization header missing' });
  }
};
