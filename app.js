import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import note from "./data/notes.js";
import { noteValidator, validate } from "./validators/noteValidator.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get("/notes", async (req, res) => {
  const notes = await note.find();
  return (res.json(notes));
});

app.post("/notes",noteValidator, validate, async(req, res) => {
  const { title, content } = req.body;
  const newNote = { title, content };
  // !newNote.title || !newNote.content ? res.status(400).json({ error: "Title and content are required." }) :
  await (note.create(newNote));
  return res.status(201).json(newNote);
});

app.put("/notes/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { returnDocument: 'after' }
    );
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found." });
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ error: "Invalid note ID." });
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const deletedNote = await note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found." });
    }
    res.json(deletedNote);
  } catch (error) {
    res.status(400).json({ error: "Invalid note ID." });
  }
});

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();