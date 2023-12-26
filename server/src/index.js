import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

import connectDB from "./db/index.js";
import { application } from "express";

connectDB()
    .then(() => {
        application.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed: ", err);
    });