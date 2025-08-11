const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  console.log("📝 Signup attempt received:", { 
    body: req.body, 
    contentType: req.get('Content-Type'),
    userAgent: req.get('User-Agent')
  });

  const { name, email, password, role, teachSkills, learnSkills } = req.body;

  if (!name || !email || !password) {
    console.log("❌ Missing required fields:", { name: !!name, email: !!email, password: !!password });
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    console.log("🔍 Checking for existing user with email:", email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists:", email);
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("👤 Creating new user...");
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      teachSkills,
      learnSkills,
    });

    console.log("💾 Saving user to database...");
    const savedUser = await newUser.save();
    console.log("✅ User saved successfully:", savedUser._id);

    console.log("🎫 Generating JWT token...");
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("🍪 Setting cookie...");
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Adjusted for compatibility
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("🎉 Signup completed successfully");
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: savedUser,
      token,
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    console.error("❌ Error stack:", error.stack);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing email or password" });
  }
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      sameSite: "lax", // Adjusted for compatibility
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      sameSite:"lax", // Adjusted for compatibility
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging out",
      error: error.message,
    });
  }
};

const isAuthenticated = (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "Authenticated" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Not Authenticated",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  isAuthenticated,
};
