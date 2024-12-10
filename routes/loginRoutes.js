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

// import express from 'express';

// const router = express.Router();

// // 🟢 GET route
// router.get('/users', (req, res) => {
//   res.json({ message: 'GET request to /api/users successful!' });
// });

// // 🟢 POST route
// router.post('/users', (req, res) => {
//   const userData = req.body;
//   res.json({ message: 'POST request to /api/users successful!', data: userData });
// });

// export default router;

// import express from 'express';
// import bcrypt from 'bcryptjs'; // For password hashing
// import jwt from 'jsonwebtoken'; // For generating tokens
// import User from '../models/User.js'; // Import User model (make sure you have this file)
// import loginRoutes from './routes/loginRoutes.js'; 

// const router = express.Router();

// /**
//  * @route   GET /api/users
//  * @desc    Get all users
//  * @access  Public
//  */
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find(); // Get all users from the database
//     res.status(200).json({
//       message: '✅ Users fetched successfully!',
//       users,
//     });
//   } catch (error) {
//     console.error('❌ Error fetching users:', error);
//     res.status(500).json({
//       message: '❌ Internal Server Error. Please try again later.',
//     });
//   }
// });

// /**
//  * @route   POST /api/users
//  * @desc    Create/Register a new user
//  * @access  Public
//  */
// router.post('/users', async (req, res) => {
//   const { name, email, password } = req.body;

//   // Check if all required fields are provided
//   if (!name || !email || !password) {
//     return res.status(400).json({
//       message: '⚠️ All fields (name, email, and password) are required!',
//     });
//   }

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: '⚠️ User with this email already exists!',
//       });
//     }

//     // Hash the password before saving it in the database
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create a new user and save it to the database
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     const savedUser = await newUser.save();

//     res.status(201).json({
//       message: '✅ User created successfully!',
//       user: {
//         id: savedUser._id,
//         name: savedUser.name,
//         email: savedUser.email,
//       },
//     });
//   } catch (error) {
//     console.error('❌ Error creating user:', error);
//     res.status(500).json({
//       message: '❌ Internal Server Error. Please try again later.',
//     });
//   }
// });

// /**
//  * @route   ALL /api/*
//  * @desc    Handle unknown routes
//  */
// router.all('*', (req, res) => {
//   res.status(404).json({
//     message: '❌ Route not found for /api',
//   });
// });

// export default router;

// import express from 'express';
// import bcrypt from 'bcryptjs'; // For password hashing
// import jwt from 'jsonwebtoken'; // For generating JSON Web Token
// import User from '../models/User.js'; // Assuming you have a User model

// const router = express.Router();

// // POST /api/login - Handle user login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Check if email and password are provided
//   if (!email || !password) {
//     return res.status(400).json({
//       message: 'Email and password are required!',
//     });
//   }

//   try {
//     // Check if user exists in the database
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         message: 'User not found!',
//       });
//     }

//     // Compare the provided password with the hashed password in the database
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         message: 'Invalid credentials!',
//       });
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' } // Token expires in 1 hour
//     );

//     // Send success response with token and user data
//     return res.status(200).json({
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         name: user.name,
//       },
//     });
//   } catch (error) {
//     console.error('Error during login:', error);
//     return res.status(500).json({
//       message: 'Internal Server Error',
//     });
//   }
// });

// // Handle unknown routes for this endpoint
// router.all('*', (req, res) => {
//   res.status(404).json({
//     message: 'Route not found for /api/login',
//   });
// });

// export default router;

// // // import express from 'express';

// // // const router = express.Router();

// // // // POST /api/login - Handle user login (Universal login)
// // // router.post('login/', (req, res) => {
// // //   const { email, password } = req.body;

// // //   // Check if email and password are provided
// // //   if (!email || !password) {
// // //     return res.status(400).json({
// // //       message: 'Email and password are required!',
// // //     });
// // //   }

// // //   // For universal login, accept any email and password
// // //   return res.status(200).json({
// // //     message: 'Login successful',
// // //     token: 'universal-mock-token', // Provide a mock token
// // //     user: {
// // //       email, // Echo back the email provided
// // //     },
// // //   });
// // // });

// // // // Handle unknown routes for this endpoint
// // // router.all('*', (req, res) => {
// // //   res.status(404).json({
// // //     message: 'Route not found for /api/login',
// // //   });
// // // });

// // // export default router;



