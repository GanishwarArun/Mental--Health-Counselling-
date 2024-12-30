
import express from 'express';
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating JSON Web Token
import User from '../models/User.js'; // Assuming you have a User model

const router = express.Router();

/**
 * @route   POST /api/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({
      message: '⚠️ Name, email, and password are required!',
    });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: '⚠️ User already exists!',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    // Send success response
    return res.status(201).json({
      message: '✅ User registered successfully!',
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.error('❌ Error during registration:', error);
    return res.status(500).json({
      message: '❌ Internal Server Error. Please try again later.',
    });
  }
});

/**
 * @route   POST /api/login
 * @desc    Handle user login
 * @access  Public
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: '⚠️ Email and password are required!',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: '⚠️ User not found!',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: '⚠️ Invalid credentials!',
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: '✅ Login successful!',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('❌ Error during login:', error);
    return res.status(500).json({
      message: '❌ Internal Server Error. Please try again later.',
    });
  }
});

/**
 * @route   GET /api/user/:id
 * @desc    Get user details by ID (for testing)
 * @access  Private
 */
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: '⚠️ User not found!',
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error fetching user:', error);
    return res.status(500).json({
      message: '❌ Internal Server Error. Please try again later.',
    });
  }
});

/**
 * @route   PUT /api/user/:id
 * @desc    Update user details (for testing)
 * @access  Private
 */
router.put('/user/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({
        message: '⚠️ User not found!',
      });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('❌ Error updating user:', error);
    return res.status(500).json({
      message: '❌ Internal Server Error. Please try again later.',
    });
  }
});

export default router;
