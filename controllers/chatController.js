import Chat from '../models/chatModel.js';

// Fetch all chat messages
export const getAllMessages = async (req, res) => {
  try {
    // Fetch all chat messages from the database, sorted by timestamp (oldest first)
    const messages = await Chat.find().sort({ timestamp: 1 });
    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    // Handle error if fetching messages fails
    console.error('Error in getAllMessages:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
      error: error.message
    });
  }
};

// Create a new message
export const createMessage = async (req, res) => {
  const { message, sender, receiver, timestamp } = req.body;

  // Debugging: log the request body to verify input
  console.log('Request Body:', req.body);

  // Validate that message, sender, and receiver are provided
  if (!message || !sender || !receiver) {
    return res.status(400).json({
      success: false,
      message: 'Message, sender, and receiver are required'
    });
  }

  try {
    // Create a new message instance
    const newMessage = new Chat({ message, sender, receiver, timestamp });

    // Save the new message to the database
    await newMessage.save();

    // Return the created message as a response
    res.status(201).json({
      success: true,
      data: newMessage
    });
  } catch (error) {
    // Log error and respond with failure message
    console.error('Error in createMessage:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
};

