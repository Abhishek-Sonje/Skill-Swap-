const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const { copyFileSync } = require("fs");

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017/SkillSwap";

// Chat App
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // 👈 frontend origin
    credentials: true, // 👈 allow credentials (cookies )
  },
});
io.on("connection", (socket) => {
  console.log("🟢 client is connected", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 client is disconnected", socket.id);
  });

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });
});


// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // 👈 frontend origin
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

// Default route
app.get("/", (req, res) => {
  res.send("✅ API is working!");
});


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
