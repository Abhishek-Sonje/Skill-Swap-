const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Import User model

const userAuth = async (req, res, next) => {
  console.log("🔍 Auth middleware - Headers:", {
    origin: req.get("Origin"),
    userAgent: req.get("User-Agent"),
    contentType: req.get("Content-Type"),
  });
  console.log("🍪 Cookies received:", req.cookies);

  const { token } = req.cookies;

  if (!token) {
    console.log("❌ No token found in cookies");
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - No token provided" });
  }

  try {
    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET not configured");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    console.log("🔓 Verifying token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", { userId: decoded.id });

    if (!decoded?.id) {
      console.log("❌ Invalid token structure");
      return res
        .status(401)
        .json({
          success: false,
          message: "Unauthorized - Invalid token structure",
        });
    }

    // Optional: Fetch full user data from database
    // This ensures the user still exists and gets fresh data
    try {
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        console.log("❌ User not found in database");
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized - User not found" });
      }
      req.user = user; // Attach full user object
      console.log("✅ User authenticated:", user.email);
    } catch (dbError) {
      console.error("❌ Database error:", dbError);
      // Fallback to just using decoded token data
      req.user = { _id: decoded.id };
    }

    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Token expired" });
    } else {
      return res
        .status(500)
        .json({
          success: false,
          message: "Server error",
          error: error.message,
        });
    }
  }
};

module.exports = userAuth;
