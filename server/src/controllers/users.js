import User from '../models/user.js';
import bcrypt from 'bcryptjs';

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

export const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).send({error: 'Please provide email and password!'});
  }

  try {
    const user = await User.findOne({email});
    
    if (!user) {
      return res.status(400).send({error: 'Invalid credentials!'});
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).send({error: 'Invalid credentials!'});
    }

    const token = user.generateToken();

    res.status(200).send({user, token});
  } catch (error) {
    res.status(400).send({error: error.message});
  }
}