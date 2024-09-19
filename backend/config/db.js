const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const DB_URL_DEV = process.env.DB_URL_DEV;
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL_DEV);
        console.log("[DATABASE] Database connected successfully");
    } catch (err) {
        console.log("[DATABASE] Error:", err);
    }
};

module.exports = connectDB;
