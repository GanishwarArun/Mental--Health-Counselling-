// chatController.js

// Sample functions for chat functionalities
export const getChats = (req, res) => {
    res.json({ message: "Fetching all chats" });
  };
  
  export const createChat = (req, res) => {
    const { user1, user2, message } = req.body;
    res.json({ message: `Chat created between ${user1} and ${user2}`, chat: { user1, user2, message } });
  };
  
  export const deleteChat = (req, res) => {
    const { chatId } = req.params;
    res.json({ message: `Chat with ID ${chatId} deleted` });
  };
  