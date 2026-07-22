import express from "express";
import { noteValidator, validate } from "../validators/noteValidator.js";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getNotes);
router.post("/", noteValidator, validate, createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;