const express = require("express");
const router = express.Router();
const prevChat=require("../controllers/chatController")

router.get("/:userId/:otherUserId", prevChat);

module.exports= router;