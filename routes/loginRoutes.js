import express from 'express';

const router = express.Router();

// POST /api/login - Handle user login (Universal login)
router.post('login/', (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required!',
    });
  }

  // For universal login, accept any email and password
  return res.status(200).json({
    message: 'Login successful',
    token: 'universal-mock-token', // Provide a mock token
    user: {
      email, // Echo back the email provided
    },
  });
});

// Handle unknown routes for this endpoint
router.all('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found for /api/login',
  });
});

export default router;



