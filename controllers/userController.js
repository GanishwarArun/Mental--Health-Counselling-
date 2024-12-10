import mongoose from 'mongoose';

// User model schema definition
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Email must be unique
  },
  password: {
    type: String,
    required: true, // Password is required
  },
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Use the existing User model if it is already defined, otherwise define a new model
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;


// // Controller for user registration
// export const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         if (!name || !email || !password) {
//             return res.status(400).json({ message: '⚠️ All fields are required!' });
//         }

//         // Simulate saving user to the database
//         res.status(201).json({ message: '✅ User registered successfully!' });
//     } catch (error) {
//         res.status(500).json({ message: '🚨 Error registering user.' });
//     }
// };

// // Controller for user login
// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     if (email === process.env.EMAIL && password === process.env.PASSWORD) {
//         return res.status(200).json({ message: '✅ Login successful!' });
//     }
//     res.status(401).json({ message: '❌ Invalid email or password!' });
// };

// // Get all users
// export const getAllUsers = async (req, res) => {
//     res.status(200).json({ message: '✅ All users retrieved successfully!' });
// };
