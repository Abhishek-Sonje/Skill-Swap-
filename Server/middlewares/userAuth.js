const jwt=require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

    if (!token) {
       
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken.id) {
      req.body.userId = decodedToken.id;
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }

};

module.exports =  userAuth ;