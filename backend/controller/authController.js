const User = require("../models/User");
const Recruiter = require("../models/Recruiter");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signUp = async (req, res, role) => {
    try {
        const { name, email, password } = req.body;
        var user;
        if (role === true) {
            user = new Recruiter({
                name,
                email,
                password,
            });
        } else {
            user = new User({
                name,
                email,
                password,
            });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        const token = jwt.sign(
            { userId: user._id, recruiter: role },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
        res.status(201).json({
            token,
            userId: user._id,
            name: user.name,
            emsil: user.email,
            role: role,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const signIn = async (req, res, role) => {
    try {
        const { email, password } = req.body;
        var user;
        if (role === true) {
            user = await Recruiter.findOne({
                email,
            });
        } else {
            user = await User.findOne({
                email,
            });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { userId: user._id, recruiter: role },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
        res.json({
            token,
            userId: user._id,
            name: user.name,
            email: user.email,
            role: role,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.signUp = signUp;
exports.signIn = signIn;
