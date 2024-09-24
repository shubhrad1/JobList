const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");

const userController = require("./controller/userController");
const recruiterController = require("./controller/recruiterController");
const signUpController = require("./controller/authController");
const signInController = require("./controller/authController");
const jobController = require("./controller/jobController");
const applicationController = require("./controller/applicationController");
const authentication = require("./middlewares/authentication");

const app = express(); // Initialize express

db(); // Connect to database

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 8000;

//v1Router
const v1Router = express.Router();

v1Router.get("/healthz", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

//User Routes
v1Router.get("/getUser", authentication, (req, res) => {
    userController.getUserbyID(req, res);
});
v1Router.get("/getUsers", (req, res) => {
    userController.getUsers(req, res);
});
v1Router.post("/user/signUp", (req, res) => {
    signUpController.signUp(req, res, false);
});
v1Router.post("/user/signIn", (req, res) => {
    signInController.signIn(req, res, false);
});
v1Router.get("/getUserDatas", (req, res) => {
    userController.getUserData(req, res);
});
v1Router.get("/getUserData", (req, res) => {
    userController.getUserDatabyID(req, res);
});
v1Router.post("/postUserData", (req, res) => {
    userController.postUserData(req, res);
});
v1Router.patch("/updateUserData", (req, res) => {
    userController.updateUserData(req, res);
});

//Recruiter Routes
v1Router.get("/getRecruiters", (req, res) => {
    recruiterController.getRecruiters(req, res);
});
v1Router.get("/getRecruiter", authentication, (req, res) => {
    recruiterController.getRecruiterbyID(req, res);
});
v1Router.post("/recruiter/signUp", (req, res) => {
    signUpController.signUp(req, res, true);
});
v1Router.post("/recruiter/signIn", (req, res) => {
    signInController.signIn(req, res, true);
});
v1Router.get("/getRecruiterData", (req, res) => {
    recruiterController.getRecruiterData(req, res);
});
v1Router.post("/postRecruiterData", (req, res) => {
    recruiterController.postRecruiterData(req, res);
});
v1Router.patch("/updateRecruiterData", (req, res) => {
    recruiterController.updateRecruiterData(req, res);
});

//Job Routes
v1Router.get("/getJob", authentication, (req, res) => {
    jobController.getJobbyID(req, res);
});
v1Router.get("/getJobById", (req, res) => {
    jobController.getJobbyJobID(req, res);
});
v1Router.get("/getJobsByIds", (req, res) => {
    jobController.getJobsbyIDS(req, res);
});
v1Router.get("/getJobs", (req, res) => {
    jobController.getJobs(req, res);
});
v1Router.post("/postJob", authentication, (req, res) => {
    jobController.postJob(req, res);
});
v1Router.patch("/updateJob", (req, res) => {
    jobController.updateJob(req, res);
});
v1Router.delete("/deleteJob", (req, res) => {
    jobController.deleteJob(req, res);
});

//Application Routes
v1Router.get("/user/getApplication", authentication, (req, res) => {
    applicationController.getApplicationsbyUserID(req, res);
});
v1Router.get("/job/getApplication", (req, res) => {
    applicationController.getApplicationsbyJobID(req, res);
});
v1Router.post("/postApplication", authentication, (req, res) => {
    applicationController.postApplication(req, res);
});
v1Router.patch("/updateApplication", authentication, (req, res) => {
    applicationController.updateApplication(req, res);
});

//Mounting Router
app.use("/api/v1", v1Router);

//Error Handling
app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

//Server
app.listen(PORT, () => {
    try {
        console.log("[SERVER] Server started on PORT:", PORT);
    } catch (err) {
        console.log("[SERVER] Error:", err);
    }
});
