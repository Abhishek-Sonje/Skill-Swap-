const User = require("../models/user.js");

const registerUser = async (req, res) => {
  const { name, role, teachSkills, learnSkills } = req.body;

  try {
    const user = new User({ name, role, teachSkills, learnSkills });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("❌ Error registering user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.error("❌ Error fetching users:", error.message);
      res.status(500).json({ message: "Internal server error" });
    });
};

const matchUser = async (req, res) => {
  try {
    let user =await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let matches = await User.find({
      _id: { $ne: user._id },
      $or: [
        { teachSkills: { $in: user.learnSkills } },
        { learnSkills: { $in: user.teachSkills } }
      ],
    });
    res.status(200).json(matches);
    
  }
  catch (error) {
    console.error("❌ Error matching user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  registerUser,
  getUsers,
  matchUser
};
