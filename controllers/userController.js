import {createUser, loginUser} from "../model/userModel.js";
import  generateToken  from "../utils/auth.js";

export const registerUser = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        const token = generateToken(newUser);
        return res.status(201).json( {
            username: newUser.username,
            email: newUser.email,
            id: newUser._id , token 

        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
export const login = async (req, res) => {
    try {
        const user = await loginUser(req.body);
        const token = generateToken(user);
        return res.json({ username: user.username, email: user.email, id: user._id, token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
