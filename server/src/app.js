import express from "express";
import cookieParser from "cookie-parser";
import cors from "cookie-parser";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

export { app };
