import User from '../models/user.model.js';

export const getUsers = async (req, res) => {
  try {
    const LoggedInUserId = req.user._id;
    const allUsers = await User.find({ _id: { $ne: LoggedInUserId } }).select(
      '-password'
    ); // get every user except for the current one
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log('Error in getUsers controller: ', error.message);
    return res.status(500).json({ error: 'internal server error' });
  }
};
