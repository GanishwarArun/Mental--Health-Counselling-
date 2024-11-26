// routes/chatRoutes.js
import express from 'express';
const router = express.Router();

// Example route handlers (adjust according to your needs)
router.get('/', (req, res) => {
    res.send('List of chats');
});

router.post('/', (req, res) => {
    // Logic to create a new chat
    res.send('Create a new chat');
});

export default router;

// // routes/chatRoutes.js
// import express from "express";
// import { getChats, createChat, deleteChat } from "../controllers/chatController.js";

// const router = express.Router();

// // Define chat routes
// router.get("/", getChats);   // List all chats
// router.post("/", createChat);  // Create a new chat
// router.delete("/:chatId", deleteChat);  // Delete a specific chat

// export default router;

// // routes/chatRoutes.js
// import express from "express";
// import { getChats, createChat, deleteChat } from "../controllers/chatController.js";

// const router = express.Router();

// // Define chat routes
// router.get("/", getChats);
// router.post("/", createChat);
// router.delete("/:chatId", deleteChat);

// export default router;

// // // chatRoutes.js
// // import express from "express";
// // import { getChats, createChat, deleteChat } from "../controllers/chatController.js";

// // const router = express.Router();

// // // Routes for chat functionalities
// // router.get("/", getChats); // Fetch all chats
// // router.post("/", createChat); // Create a new chat
// // router.delete("/:chatId", deleteChat); // Delete a chat by ID

// // export default router;
