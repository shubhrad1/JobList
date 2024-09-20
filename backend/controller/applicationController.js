const Application = require("../models/Application");

const getApplicationsbyUserID = async (req, res) => {
    try {
        const userId = req.body.userId;
        const applications = await Application.find({ userId: userId });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getApplicationsbyJobID = async (req, res) => {
    try {
        const jobId = req.body.jobId;
        const applications = await Application.find({ jobId: jobId });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postApplication = async (req, res) => {
    const { userId, jobId, resume, status } = req.body;
    try {
        const application = new Application({
            userId: userId,
            jobId: jobId,
            resume: resume,
            status: status,
        });
        await application.save();
        res.status(201).json({ message: "Application posted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateApplication = async (req, res) => {
    const { applicationId, data } = req.body;
    try {
        const application = await Application.findOneAndUpdate(
            { _id: applicationId },
            { $set: data },
            { new: true }
        );
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        res.status(200).json({ message: "Application updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getApplicationsbyUserID,
    getApplicationsbyJobID,
    postApplication,
    updateApplication,
};
