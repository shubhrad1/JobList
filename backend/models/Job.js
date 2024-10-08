const mongoose = require("mongoose");
const Recruiter = require("./Recruiter");

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recruiter",
        required: true,
    },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
