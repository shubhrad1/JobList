const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");

const userController = require("./controller/userController");
const recruiterController = require("./controller/recruiterController");
const signUpController = require("./controller/authController");
const signInController = require("./controller/authController");

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
v1Router.get("/getUser/:id", (req, res) => {
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

//Recruiter Routes
v1Router.get("/getRecruiters", (req, res) => {
    recruiterController.getRecruiters(req, res);
});
v1Router.get("/getRecruiter/:id", (req, res) => {
    recruiterController.getRecruiterbyID(req, res);
});
v1Router.post("/recruiter/signUp", (req, res) => {
    signUpController.signUp(req, res, true);
});
v1Router.post("/recruiter/signIn", (req, res) => {
    signInController.signIn(req, res, true);
});

app.use("/api/v1", v1Router);

app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
    try {
        console.log("[SERVER] Server started on PORT:", PORT);
    } catch (err) {
        console.log("[SERVER] Error:", err);
    }
});
