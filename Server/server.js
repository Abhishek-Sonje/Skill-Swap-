const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
require("dotenv").config();

const Chat = require("./models/message.js");

const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");

const app = express();
// Trust proxy so secure cookies work behind Render/Heroku
app.set("trust proxy", 1);

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/SkillSwap";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Chat App
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Remove trailing slash for comparison
      const cleanOrigin = origin.replace(/\/$/, "");
      const allowedOrigin = FRONTEND_URL.replace(/\/$/, "");

      if (cleanOrigin === allowedOrigin) {
        callback(null, true);
      } else {
        console.log(
          `🚫 Socket.IO CORS blocked: ${origin} (expected: ${FRONTEND_URL})`
        );
        callback(new Error("Not allowed by Socket.IO CORS"));
      }
    },
    credentials: true, // 👈 allow credentials (cookies)
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
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Remove trailing slash for comparison
      const cleanOrigin = origin.replace(/\/$/, "");
      const allowedOrigin = FRONTEND_URL.replace(/\/$/, "");

      if (cleanOrigin === allowedOrigin) {
        callback(null, true);
      } else {
        console.log(`🚫 CORS blocked: ${origin} (expected: ${FRONTEND_URL})`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // 👈 allow credentials (cookies)
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// API Endpoints - Register these BEFORE any catch-all routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// Health check endpoint for Render
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Default route
app.get("/", (req, res) => {
  res.send("✅ API is working!");
});

// Debug: Log all registered routes
console.log("🔍 Registered routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(
      `  ${Object.keys(middleware.route.methods).join(",")} ${
        middleware.route.path
      }`
    );
  } else if (middleware.name === "router") {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(
          `  ${Object.keys(handler.route.methods).join(
            ","
          )} ${middleware.regexp.source
            .replace("^\\/", "")
            .replace("\\/?(?=\\/|$)", "")}${handler.route.path}`
        );
      }
    });
  }
});

// Note: Static file serving removed since frontend is deployed separately on Vercel
// and Render only deploys the backend server

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Async MongoDB connection and server start
const startServer = async () => {
  try {
    console.log("🚀 Starting Skill Swap Server...");
    console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`🔌 Port: ${PORT}`);
    console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
    console.log(
      `🔒 CORS Origin: ${FRONTEND_URL.replace(
        /\/$/,
        ""
      )} (trailing slash removed)`
    );
    console.log(`🗄️  MongoDB URI: ${MONGO_URI ? "Set" : "Not set"}`);

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log("🎯 Health check available at /api/health");
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // Stop app if DB connection fails
  }
};

startServer();
