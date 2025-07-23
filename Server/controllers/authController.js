const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { name, email, password, role, teachSkills, learnSkills } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        // console.log("Existing User:", existingUser);
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            teachSkills,
            learnSkills
        })

        const savedUser = await newUser.save();
        
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
        res.status(201).json({ user: savedUser, token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
 
}

const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.find({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({id:user._id },process.env.JWT_SECRET,{expiresIn: "2d"});
        res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    register,login
};
 