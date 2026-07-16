import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
	try {
		const uri = process.env.MONGODB_URI;

		if (!uri) {
			throw new Error('Missing MongoDB connection string');
		}

		await mongoose.connect(uri, {
			dbName: 'projjj'
		});
		console.log('MongoDB connected');
	} catch (error) {
		console.error('Database connection failed:', error.message);
		process.exit(1);
	}
};

export default connectDB;