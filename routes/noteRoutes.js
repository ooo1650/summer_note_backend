import express from "express";
import { noteValidator, validate } from "../validators/noteValidator.js";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/noteController.js";
import authenticateToken  from "../middelwares/auth.js";

const router = express.Router();

router.get("/", getNotes);
router.post("/", authenticateToken, noteValidator, validate, createNote);
router.put("/:id", authenticateToken, updateNote);
router.delete("/:id", authenticateToken, deleteNote);

export default router;