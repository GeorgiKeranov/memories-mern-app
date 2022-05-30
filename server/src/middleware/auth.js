import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
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

    req.authUserId = tokenData._id;
    next();
  } catch (error) {
    res.status(401).send({
      error: 'Please provide a valid authorization token!'
    });
  }
}

export default authMiddleware;