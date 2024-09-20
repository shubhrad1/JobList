const Recruiter = require("../models/Recruiter");
const RecruiterData = require("../models/recruiterData");

const dotenv = require("dotenv");
dotenv.config();

const getRecruiters = async (req, res) => {
    try {
        const Recruiters = await Recruiter.find();
        res.json(Recruiters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getRecruiterbyID = async (req, res) => {
    try {
        const Recruiter = await Recruiter.findById(req.params.id);
        if (!Recruiter) {
            return res.status(404).json({ message: "Recruiter not found" });
        }
        res.json(Recruiter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getRecruiterData = async (req, res) => {
    try {
        const recruiterData = await RecruiterData.find();
        res.json(recruiterData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getRecruiterDatabyID = async (req, res) => {
    try {
        const recruiterData = await RecruiterData.findById(req.params.id);
        if (!recruiterData) {
            return res.status(404).json({ message: "RecruiterData not found" });
        }
        res.json(recruiterData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const postRecruiterData = async (req, res) => {
    try {
        const { recruiterId, position, company } = req.body;
        const recruiterData = new RecruiterData({
            recruiterId: recruiterId,
            position: position,
            company: company,
        });
        await recruiterData.save();
        res.status(201).json(recruiterData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const updateRecruiterData = async (req, res) => {
    const { userId, updatedData } = req.body;
    try {
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        const updateRecruiterData = await RecruiterData.findOneAndUpdate(
            { recruiterId: userId },
            { $set: updatedData },
            { new: true }
        );

        if (!updateRecruiterData) {
            return res.status(404).json({ message: "RecruiterData not found" });
        }
        res.status(200).json(updateRecruiterData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const deleteRecruiterData = async (req, res) => {
    try {
        const recruiterData = await RecruiterData.findOneAndDelete({
            recruiterId: req.params.id,
        });
        await recruiterData.remove();
        res.json({ message: "RecruiterData deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//Exports

exports.getRecruiterbyID = getRecruiterbyID;
exports.getRecruiters = getRecruiters;
exports.getRecruiterData = getRecruiterData;
exports.getRecruiterDatabyID = getRecruiterDatabyID;
exports.postRecruiterData = postRecruiterData;
exports.updateRecruiterData = updateRecruiterData;
