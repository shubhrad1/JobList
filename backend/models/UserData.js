const mongoose = require("mongoose");
const User = require("./User");
const educationSchema = new mongoose.Schema({
    institute: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    startDate: {
        type: Number,
        required: true,
    },
    endDate: {
        type: Number,
        required: false,
    },
    grade: {
        type: Number,
        required: false,
    },
});
const experienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    startDate: {
        type: Number,
        required: true,
    },
    endDate: {
        type: Number,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
});
const userDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    education: [educationSchema],
    experience: [experienceSchema],
    resume: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
