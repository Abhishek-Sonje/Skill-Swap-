const express = require("express");
const router = express.Router();
const prevChat=require("../controllers/chatController")

// Route for getting chat history between two users
router.get("/:user1/:user2", (req, res, next) => {
  const { user1, user2 } = req.params;
  
  // Validate parameters
  if (!user1 || !user2 || user1 === 'undefined' || user2 === 'undefined') {
    return res.status(400).json({ error: 'Invalid user IDs' });
  }
  
  // Map to expected parameter names
  req.params.userId = user1;
  req.params.otherUserId = user2;
  
  // Call the controller
  prevChat(req, res, next);
});

// Test route to verify routing works
router.get("/test", (req, res) => {
  res.json({ message: "Chat routes working" });
});

module.exports= router;