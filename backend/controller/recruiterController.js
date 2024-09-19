const Recruiter = require("../models/Recruiter");

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

//Exports

exports.getRecruiterbyID = getRecruiterbyID;
exports.getRecruiters = getRecruiters;
