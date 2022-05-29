import User from '../models/user.js';

export const registerUser = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    const token = user.generateToken();

    res.status(200).send({user, token});
  } catch (error) {
    res.status(400).send({error: error.message});
  }
}