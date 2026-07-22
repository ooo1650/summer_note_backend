import {
  createNewNote,
  deleteExistingNote,
  getAllNotes,
  updateExistingNote,
} from "../model/note.js";

export const getNotes = async (req, res) => {
  const notes = await getAllNotes();
  return res.json(notes);
};

export const createNote = async (req, res) => {
  const newNote = await createNewNote(req.body);
  return res.status(201).json(newNote);
};

export const updateNote = async (req, res) => {
  try {
    const updatedNote = await updateExistingNote(req.params.id, req.body);

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found." });
    }

    return res.json(updatedNote);
  } catch (error) {
    return res.status(400).json({ error: "Invalid note ID." });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await deleteExistingNote(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found." });
    }

    return res.json(deletedNote);
  } catch (error) {
    return res.status(400).json({ error: "Invalid note ID." });
  }
};