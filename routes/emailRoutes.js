import express from 'express';

const router = express.Router();

// Test Route (GET)
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Email routes are working!' });
});

// Send Email Route (POST)
router.post('/send-email', (req, res) => {
  const { email, subject, message } = req.body;

  // Basic validation
  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'All fields (email, subject, message) are required.' });
  }

  // Simulating email sending process
  console.log('Email details:', { email, subject, message });

  // Responding back with success
  res.status(200).json({
    success: true,
    message: 'Email sent successfully!',
    data: { email, subject, message },
  });
});

export default router;
