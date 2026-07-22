import User from "../data/user.js";
import bcrypt from "bcrypt";


export const createUser = (userData) => {
    return User.create(userData);
}

export const loginUser = async (userData) => {
        const { email, password } = userData;
        const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    return existingUser;
}   