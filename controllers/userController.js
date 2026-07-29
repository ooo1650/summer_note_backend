import { createUser, loginUser } from "../model/userModel.js";
import generateToken from "../utils/auth.js";
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        const token = generateToken(newUser);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 3600000, // 1 hour
        });
        return res.status(201).json({
            username: newUser.username,
            email: newUser.email,
            id: newUser._id,
            
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const user = await loginUser(req.body);
        const token = generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 3600000, // 1 hour
        });
        return res.json({ username: user.username, email: user.email, id: user._id, });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
