const mongoose = require("mongoose");
const Recruiter = require("./Recruiter");

const recruiterDataSchema = new mongoose.Schema({
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recruiter",
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
});

const RecruiterData = mongoose.model("RecruiterData", recruiterDataSchema);

module.exports = RecruiterData;
