import expressAsyncHandler from "express-async-handler";
import {ApiError} from "../utils/ApiError.js"
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifyJWT = expressAsyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) throw new ApiError(401, "Unauthorized request");

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decodedToken?._id;

        const user = await User.findById({userId}).select("-password -refreshToken");

        if (!user) throw new ApiError(401, "Invalid Access Token");
        req.user = user;
        next();
    } catch (error) {
       throw new ApiError(401, error?.message || "Invalid access token");
    }
})