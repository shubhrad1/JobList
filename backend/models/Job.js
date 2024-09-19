const mongoose = require("mongoose");

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
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
