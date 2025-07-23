const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

require("dotenv").config();

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017/SkillSwap";

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// console.log("userRoutes", userRoutes);
app.use("/api/users", userRoutes);
// console.log("authRoutes", authRoutes);
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

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // Stop app if DB connection fails
  }
};

startServer();
