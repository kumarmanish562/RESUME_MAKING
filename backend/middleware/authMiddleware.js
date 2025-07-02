import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


export const protect = (req, res, next) => {
  try{
    let token = req.headers.authorization;
    if (!token && token.startsWith('Bearer')) {
      token = token.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = User.findById(decoded.id).select('-password');
      next();
    }
    else {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
}

    