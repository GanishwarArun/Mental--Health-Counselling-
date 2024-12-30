import express from 'express';
import { getAllMessages, createMessage } from '../controllers/chatController.js';

const router = express.Router();

// Fetch all chat messages
router.get('/', getAllMessages);

// Send a new message
router.post('/', createMessage);

export default router;

