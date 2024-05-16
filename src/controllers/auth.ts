import {createError, defineEventHandler, readBody, readValidatedBody} from "h3";
import {User} from "../models/user";
import {string, z} from "zod";

const signupValidation = z.object({
	name: string().min(1),
	email: string().min(1).email(),
	password: string().min(8).max(16),
	mobile: string()
		.min(10, "Must be equal to 10 digit")
		.max(10, "Invalid mobile number"),
});

const signinValidation = z.object({
	email: string().min(1).email(),
	password: string().min(8).max(16),
});
/**
 * Sign up controller
 */
export const signUp = defineEventHandler(async (event) => {
	try {
		const body = await readValidatedBody(event, (item) =>
			signupValidation.safeParse(item),
		);
		if (body.error)
			throw createError({
				status: 400,
				message: body.error.message,
			});

		const userExist = await User.findOne({email: body?.data});

		if (userExist)
			throw createError({
				status: 400,
				message: "User already existed,please register with other email",
			});

		const user = new User(body);
		await user.save();
		return user;
	} catch (error) {
		throw createError({
			status: 400,
			message: "User already existed,please register with other email",
		});
	}
});

export const signIn = defineEventHandler(async (event) => {
	try {
		const body = await readValidatedBody(event, (item) =>
			signupValidation.safeParse(item),
		);

		if (body.error)
			throw createError({
				status: 400,
				message: body.error.message,
			});

		const user = await User.findOne({email: body?.data});

		if (!user)
			throw createError({
				status: 400,
				message: "User already existed,please register with other email",
			});

		return user;
	} catch (error) {
		throw createError({
			status: 400,
			message: "User already existed,please register with other email",
		});
	}
});
