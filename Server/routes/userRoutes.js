const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuth");

const {
  registerUser,
  getUsers,
  matchUser,
  userInfo,
} = require("../controllers/userController");
const User = require("../models/user");

// router.post("/register", registerUser);

router.get("/",userAuth, getUsers);
router.get("/match/:id",userAuth, matchUser);
router.get("/:id",userAuth, userInfo);

module.exports = router;
