const User = require("../models/user.js");
const mongoose = require("mongoose");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error("❌ Error fetching users:", error.message);
      res.status(500).json({ message: "Internal server error" });
    });
};

const matchUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let matches = await User.find({
      _id: { $ne: user._id },
      $or: [
        { teachSkills: { $in: user.learnSkills } },
        { learnSkills: { $in: user.teachSkills } },
      ],
    });
    res.status(200).json(matches);
  } catch (error) {
    console.error("❌ Error matching user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userInfo = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error fetching user:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// // controllers/userController.js
const myInfo = async (req, res) => {

  if (!req.user || !req.user.id) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("❌ Error fetching user info:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { role, learnSkills, teachSkills, completed_profile } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        role,
        learnSkills,
        teachSkills,
        completed_profile,
      },
      { new: true }
    ).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("❌ Error updating profile:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  // registerUser,
  getUsers,
  matchUser,
  userInfo,
  myInfo,
  updateProfile,
};
