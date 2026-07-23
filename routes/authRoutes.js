import { login, registerUser } from "../controllers/userController.js";
import express from "express";
import authenticateToken  from "../middelwares/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authenticateToken, login);

export default router;