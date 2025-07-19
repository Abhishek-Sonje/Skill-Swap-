const express = require("express");
const router = express.Router();

const {
  registerUser,
  getUsers,
  matchUser,
  userInfo
} = require("../controllers/userController");
const User = require("../models/user");

router.post("/register", registerUser);

router.get("/", getUsers);
router.get("/match/:id", matchUser);
router.get("/:id",userInfo);
module.exports = router;
