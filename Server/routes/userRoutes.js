const express = require("express");
const router = express.Router();

const {
  registerUser,
  getUsers,
  matchUser,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.get("/", getUsers);
router.get("/match/:id", matchUser);

module.exports = router;
