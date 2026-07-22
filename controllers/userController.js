import {createUser, loginUser} from "../model/userModel.js";


export const registerUser = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
export const login = async (req, res) => {
    try {
        const user = await loginUser(req.body);
        return res.json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}