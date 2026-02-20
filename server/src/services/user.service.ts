import { User } from "../models/user.model.js";
import type { AuthCredentials } from "../types/auth.types.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {z} from "zod";

const authCredentialsSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(50, "Username must be at most 50 characters"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

const validateAuthCredentials = (credentials: AuthCredentials) => {
    const result = authCredentialsSchema.safeParse(credentials);
    if (!result.success) {
        throw new Error(result.error.message);
    }
    return result.data;
};

const signupSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters").max(100, "Full name must be at most 100 characters"),
    username: z.string().min(3, "Username must be at least 3 characters").max(50, "Username must be at most 50 characters"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

const validateSignupData = (data: { fullName: string; username: string; password: string }) => {
    const result = signupSchema.safeParse(data);
    if (!result.success) {
        throw new Error(result.error.message);
    }
    return result.data;
};

export const signupService = async (credentials: { fullName: string; username: string; password: string }) => {
    const { fullName, username, password } = validateSignupData(credentials);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, username, password: hashedPassword });
    try {
        await user.save();
    } catch (error: any) {
        if (error.code === 11000) {
            throw new Error("Username already exists");
        }
        throw error;
    }
    return user;
};

export const loginService = async (credentials: AuthCredentials) => {
    const { username, password } = validateAuthCredentials(credentials);
    const user = await User.findOne({ username });
    if (!user || !user.password) {
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET not defined");
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    return token;
}

export const verifyTokenService = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey") as { userId: string };
        const userId = decoded.userId;
        const userDetails = User.findById(userId).select("-password");
        return userDetails;
    } catch (error) {
        return error;
    }   
}