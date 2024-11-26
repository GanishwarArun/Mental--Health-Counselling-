import express from 'express';

const router = express.Router();

// Define example route
router.get('/', (req, res) => {
  res.send('User Routes Working!');
});

export default router;
