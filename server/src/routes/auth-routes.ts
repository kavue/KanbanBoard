import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  try {
    const { username, password } = req.body;

    // Look for a user with the provided username
    const user = await User.findOne({ where: { username } });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the password provided by the user with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id }, // Use the user ID for the payload
      process.env.JWT_SECRET_KEY as string, // JWT secret key
      { expiresIn: '1h' } // Set expiration (e.g., 1 hour)
    );

    // Send the token in the response
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
