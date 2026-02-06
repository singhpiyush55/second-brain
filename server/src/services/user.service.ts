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
export const signupService = async (credentials: AuthCredentials) => {
    const { username, password } = validateAuthCredentials(credentials);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secretkey");
    return token;
}