const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  // console.log("cookies:", req.cookies);
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token" });
    }

    req.user = decoded; // ✅ Attach decoded user (e.g. { id, email }) to req
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = userAuth;
