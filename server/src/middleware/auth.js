import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
      throw new Error();
    }

    const partsOfAuthorizationHeader = authorizationHeader.split(' ');
    if (partsOfAuthorizationHeader.length !== 2) {
      throw new Error();
    }

    const token = partsOfAuthorizationHeader[1];
    const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const authUserId = tokenData._id;

    const authUser = await User.findById(authUserId);
    if (!authUser) {
      throw new Error();
    }

    req.authUser = authUser;

    next();
  } catch (error) {
    res.status(401).send({
      error: 'Please provide a valid authorization token!'
    });
  }
}

export default authMiddleware;