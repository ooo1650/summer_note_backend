import mongoose from "mongoose";

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const note = mongoose.model("Note", NoteSchema);

export const getAllNotes = async () => {
  return note.find();
};

export const createNewNote = async ({ title, content }) => {
  const newNote = { title, content };
  await note.create(newNote);
  return newNote;
};

export const updateExistingNote = async (id, { title, content }) => {
  return note.findByIdAndUpdate(
    id,
    { title, content },
    { returnDocument: "after" }
  );
};

export const deleteExistingNote = async (id) => {
  return note.findByIdAndDelete(id);
};

export default note;