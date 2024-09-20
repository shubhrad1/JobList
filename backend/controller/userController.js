const User = require("../models/User");
const UserData = require("../models/UserData");

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
const getUserData = async (req, res) => {
    try {
        const UserData = await UserData.find();
        res.json(UserData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const postUserData = async (req, res) => {
    const { userId, institute, degree, startDate, endDate, grade } = req.body;
    try {
        const userData = new UserData({
            userId: userId,
            institute: institute,
            degree: degree,
            startDate: startDate,
            endDate: endDate,
            grade: grade,
        });
        await userData.save();
        res.status(201).json({ message: "Data posted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const updateUserData = async (req, res) => {
    const { userId, data } = req.body;
    try {
        const userData = await UserData.findOneAndUpdate(
            { userId: userId },
            { $set: data },
            { new: true }
        );
        if (!userData) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Data updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Exports

exports.getUserbyID = getUserbyID;
exports.getUsers = getUsers;
exports.getUserData = getUserData;
exports.postUserData = postUserData;
exports.updateUserData = updateUserData;
