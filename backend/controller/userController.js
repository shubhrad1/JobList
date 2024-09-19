const User = require("../models/User");

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({
            name,
            email,
            password,
        });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getUserbyID = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Exports

exports.createUser = createUser;
exports.getUserbyID = getUserbyID;
exports.getUsers = getUsers;
