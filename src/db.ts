import {createError} from "h3";
import mongoose from "mongoose";

export const connectDb = async () => {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/h3-learn");
		console.log("Mongoose connected!");
	} catch (error) {
		throw createError({
			status: 500,
			message: error.message,
		});
	}
};
