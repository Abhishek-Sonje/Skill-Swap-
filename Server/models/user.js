const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    teachSkills: [String],
    learnSkills: [String],
    avatarConfig: {
        type: Object,
        default:{},
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;