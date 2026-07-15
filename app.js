import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notes from "./data/note.js";
import { noteValidator, validate } from "./validators/noteValidator.js";
import connectDB from "./config/db.js";

connectDB();

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.use(cors());
app.use(express.json());


app.get("/notes", (req, res) => {
  res.json(notes);
});

app.post("/notes",noteValidator, validate, (req, res) => {
  const { title, content } = req.body;
  const newNote = { title, content };
  // !newNote.title || !newNote.content ? res.status(400).json({ error: "Title and content are required." }) :
  notes.push(newNote);
  return res.status(201).json(newNote);
});

app.put("/notes/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const { title, content } = req.body;
  if (index >= 0 && index < notes.length) {
    notes[index] = { title, content };
    res.json(notes[index]);
  } else {
    res.status(404).json({ error: "Note not found." });
  }
});

app.delete("/notes/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < notes.length) {
    const deletedNote = notes.splice(index, 1);
    res.json(deletedNote[0]);
  } else {
    res.status(404).json({ error: "Note not found." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});