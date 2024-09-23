const Job = require("../models/Job");

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getJobbyID = async (req, res) => {
    try {
        const job = await Job.find({ recruiterId: req.user.userId });
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postJob = async (req, res) => {
    const {
        company,
        position,
        location,
        currency,
        salary,
        description,
        recruiterId,
    } = req.body;
    try {
        if (req.user.recruiter === true) {
            const job = new Job({
                company: company,
                position: position,
                location: location,
                currency: currency,
                salary: salary,
                description: description,
                recruiterId: recruiterId,
            });
            await job.save();
            res.status(201).json({ message: "Job posted successfully" });
        } else {
            res.status(401).json({ message: "Not authorized" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateJob = async (req, res) => {
    const { jobId, data } = req.body;
    try {
        const job = await Job.findOneAndUpdate(
            { _id: jobId },
            { $set: data },
            { new: true }
        );
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const jobId = req.body.jobId;
        const job = await Job.findByIdAndDelete({ _id: jobId });
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getJobs, getJobbyID, postJob, updateJob, deleteJob };
