const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
require("dotenv").config();
const path = require("path"); // Added for serving static files in production

const Chat = require("./models/message.js");

const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");

const { copyFileSync } = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/SkillSwap";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Chat App
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL, // 👈 frontend origin from environment
    credentials: true, // 👈 allow credentials (cookies )
  },
});
const userSocketMap = {}; // Track which user is connected to which socket

// Socket.IO Logic
io.on("connection", (socket) => {
  console.log("🟢 client connected:", socket.id);

  // Register the connected user
  socket.on("registerUser", ({ userId }) => {
    userSocketMap[userId] = socket.id;
    console.log(`✅ Registered user ${userId} with socket ${socket.id}`);
  });

  // Join a private room with another user
  socket.on("joinPrivateRoom", ({ fromUserId, toUserId }) => {
    const roomId = [fromUserId, toUserId].sort().join("-");
    socket.join(roomId);

    const toSocketId = userSocketMap[toUserId];
    if (toSocketId) {
      io.sockets.sockets.get(toSocketId)?.join(roomId);
    }

    socket.emit("chatInitialized", { roomId });
    // io.to(roomId).emit("chatInitialized", { roomId });
  });

  // Send private messages
  socket.on("privateMessage", async ({ roomId, message, sender, receiver }) => {
    const newMessage = new Chat({
       sender,
      receiver,
      message,
    });
    try {
      await newMessage.save();
      io.to(roomId).emit("privateMessage", { message, sender, receiver });
    } catch (err) {
      console.error("Failed to save message:", err);
      socket.emit("errorMessage", { error: "Message could not be saved" });
    }
  });

  // On disconnect
  socket.on("disconnect", () => {
    console.log("🔴 client disconnected:", socket.id);
    for (const userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }
  });
});

// Middleware
app.use(
  cors({
    origin: FRONTEND_URL, // 👈 frontend origin from environment
    credentials: true, // 👈 allow credentials (cookies)
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Endpoints
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// Health check endpoint for Render
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Default route
app.get("/", (req, res) => {
  res.send("✅ API is working!");
});

// Serve static files from the React app build folder in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Client/dist")));
  
  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/dist", "index.html"));
  });
}

// Async MongoDB connection and server start
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // Stop app if DB connection fails
  }
};

startServer();
