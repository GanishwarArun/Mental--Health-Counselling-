import express from 'express';

const router = express.Router();

// Mock database (replace this with a real database in production)
const users = [];

// Registration route
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Validate input fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required!' });
  }

  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists!' });
  }

  // Add the user to the mock database
  const newUser = { name, email, password }; // In real-world apps, hash the password
  users.push(newUser);

  // Send a success response without exposing the password
  res.status(201).json({
    message: 'Registration successful',
    user: { name, email }, // Return only safe fields
  });
});

export default router;

