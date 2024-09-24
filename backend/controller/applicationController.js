const Application = require("../models/Application");

const getApplicationsbyUserID = async (req, res) => {
    try {
        const userId = req.user.userId;
        const applications = await Application.find({ userId: userId });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getApplicationsbyJobID = async (req, res) => {
    try {
        const jobIds = req.query.jobId;
        const cleanJobId = jobIds.replace(/,]/g, "]");

        const ids = JSON.parse(cleanJobId);
        const applications = await Application.find({ jobId: { $in: ids } });

        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postApplication = async (req, res) => {
    const userId = req.user.userId;
    const role = req.user.recruiter;
    const jobId = req.body.jobId;
    const resume = req.body.resume;
    const status = req.body.status;

    if (role === true) {
        return res.status(401).json({ message: "Not authorized" });
    }
    try {
        //     const applicationExists = await Application.findOne({
        //         userId: userId,
        //         jobId: jobId,
        //     });
        //     if (applicationExists) {
        //         return res
        //             .status(400)
        //             .json({ message: "Application already exists" });
        //     }
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
    const role = req.user.recruiter;
    if (role === false) {
        return res.status(401).json({ message: "Not authorized" });
    }
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
