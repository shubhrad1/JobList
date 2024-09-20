const mongoose = require("mongoose");
const Job = require("./Job");

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
