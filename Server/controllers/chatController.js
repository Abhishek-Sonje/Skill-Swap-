const Chat = require("../models/message");
const mongoose = require("mongoose");

const prevChat =async (req, res) => {
    const { userId, otherUserId } = req.params;

    try {
        const chat = await Chat.find({
            $or: [
                { sender: userId, receiver: otherUserId },
                { sender: otherUserId, receiver: userId }
            ]
        }).sort({ timestamp: 1 });

        res.json(chat);
    }
    catch (err) {
        res.status(500).json({error:"failed to fetch messages"})
    }
}

module.exports = prevChat;