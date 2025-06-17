const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, location, profession, latitude, longitude,role } = req.body;

    // ✅ Image path from multer (if file uploaded)
    const profileImage = req.file ? `/uploads/${req.file.filename}` : '';

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }


    // ✅ Create new user
    const user = new User({
      name,
      email,
      phoneNumber,
      password,
      profileImage: req.file ? `/uploads/${req.file.filename}` : null,
      coordinates:[longitude,latitude],
      location,
      profession,
      role
    });
    console.log('Role being saved in backend:', role);
    const savedUser = await user.save();
    res.status(201).json(savedUser);

  } catch (error) {
    console.error('❌ Register Error:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if user exists
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // ✅ Create JWT token including user ID and role
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET || 'your-secret-key', // You can set this in .env file
      { expiresIn: '1d' }
    );

    // ✅ Send token + user data
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
        location: user.location,
        profession: user.profession,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({ message: 'Error logging in user', error });
  }
};
exports.markComplete = async (req, res) => {
  try {
    await Request.findByIdAndUpdate(req.params.id, { status: 'completed' });
    res.status(200).json({ message: 'Marked as completed' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating request status' });
  }
};


module.exports = {
  registerUser,
  loginUser,
};
