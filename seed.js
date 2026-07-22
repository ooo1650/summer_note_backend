import mongoose from "mongoose";
import sampleNotes from "./data/note.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import Note from "./model/note.js";
dotenv.config();

await connectDB();

try {
  // Log connection details
  console.log('Connected to:', mongoose.connection.name);
  console.log('Collection name:', Note.collection.name);
  
  // Clear existing notes
  await Note.deleteMany({});
  console.log('Cleared existing notes');
  
  // Insert new sample notes
  const result = await Note.insertMany(sampleNotes);
  console.log(`Successfully inserted ${result.length} notes`);
  console.log('Inserted documents:', result);
  
  await mongoose.connection.close();
  console.log('Connection closed');
  process.exit(0);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
} 