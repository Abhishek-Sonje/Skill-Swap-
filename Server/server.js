const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");


const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017/SkillSwap";

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

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // Stop app if DB connection fails
  }
};

startServer();
