import express from 'express';

const router = express.Router();

// Mock home route
router.get('/home', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Home Page' });
});

export default router;
