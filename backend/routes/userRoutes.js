const express = require('express');
const { registerUser,loginUser } = require('../controllers/userController');
const router = express.Router();
const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');


// ✅ Import middleware
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// ✅ Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// ✅ Signup route
router.post('/signup', upload.single('profileImage'), registerUser);

router.post('/login', loginUser); // 👈 yeh new login route add kiya

// ✅ Admin-only route: Get all users
router.get('/', protect, authorizeRoles('admin', 'seeker', 'provider'), async (req, res) => {
  try {
    // ✅ Only return users with 'provider' role
    const providers = await User.find({ role: 'provider' });
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/stats', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const users = await User.find(); // 👈 Get all users
    res.json(users); // 👈 Return full list (for counting in frontend)
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.delete('/:id', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// ✅ Update user by ID
router.put('/:id', protect, authorizeRoles('admin', 'seeker', 'provider'), async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phoneNumber, password, role },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error while updating user' });
  }
});
router.get('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

module.exports = router;
