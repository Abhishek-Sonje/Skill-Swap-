const express=require("express");
const router = express.Router();

 

const  userAuth  = require("../middlewares/userAuth");
const {register,login,logout,isAuthenticated}=require("../controllers/authController")

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/isAuthenticated",userAuth,isAuthenticated)

module.exports = router;