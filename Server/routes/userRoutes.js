const User = require("../models/user");
const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuth");

const {
  registerUser,
  getUsers,
  matchUser,
  userInfo,
  myInfo,
  updateProfile,
} = require("../controllers/userController");

// router.post("/register", registerUser);

router.get("/", userAuth, getUsers);
router.get("/match/:id", userAuth, matchUser);
router.get("/myInfo", userAuth, myInfo);
router.put("/update-profile",userAuth,updateProfile)
router.get("/:id", userAuth, userInfo);

module.exports = router;
