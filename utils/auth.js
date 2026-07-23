import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function generateToken(user) {
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
}
