const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");
const userController = require("./controller/userController");

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
v1Router.post("/createUser", (req, res) => {
    userController.createUser(req, res);
});
v1Router.get("/getUser/:id", (req, res) => {
    userController.getUserbyID(req, res);
});
v1Router.get("/getUsers", (req, res) => {
    userController.getUsers(req, res);
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
