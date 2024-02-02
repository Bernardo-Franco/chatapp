import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import genareteTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      res.status(400).json({ error: 'passwords do not match' });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: 'user already exists' });
    }
    // HASH the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //avatar - avatar.iran.liara.run/public/boy?username=${username}
    const boyProfilePic = `avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // generate JWT token here
      genareteTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ error: 'invalid user data' });
    }
  } catch (error) {
    console.log('error in signup controller', error.message);
    return res.status(500).json({ error: 'internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isCorrectPassword = await bcrypt.compare(
      password,
      user?.password || ''
    );

    if (!user || !isCorrectPassword) {
      return res.status(400).json({ error: 'invalid credentials' });
    }

    genareteTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log('error in login controller', error.message);
    return res.status(500).json({ error: 'internal server error' });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ messsage: 'logout successfully' });
  } catch (error) {
    console.log('error in logout controller', error.message);
    return res.status(500).json({ error: 'internal server error' });
  }
};
