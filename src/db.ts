import {createError} from "h3";
import mongoose from "mongoose";

export const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("instance", mongoose.connection.listeners.length);
		console.log("Mongoose connected!");
	} catch (error) {
		throw createError({
			status: 500,
			message: error.message,
		});
	}
};
