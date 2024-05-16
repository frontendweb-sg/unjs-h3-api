import mongoose, {Schema, Document} from "mongoose";
import {Password} from "../utils/password";

export const USER_TABLE = "User";
export interface User {
	name: string;
	email: string;
	password: string;
	mobile: string;
	role: string;
	active: string;
	emailVerify: boolean;
	token?: string;
	expireToken?: string;
}

const schema = new Schema(
	{
		name: {type: String, required: true},
		email: {type: String, required: true, unique: true, index: true},
		password: {type: String, required: true, select: false},
		mobile: {type: String, required: true},
		avatar: {type: String, default: ""},
		role: {type: String, default: "user", enum: ["admin", "user"]},
		active: {type: String, default: false},
		emailVerify: {type: String, default: false},
		token: {type: String, default: ""},
		expireToken: {type: String, default: ""},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret.__v;
			},
		},
	},
);

schema.pre("save", function cb(next) {
	if (this.isModified("password")) {
		this.set("password", Password.hash(this.get("password")));
	}
	this.get("role") === "admin" ? this.set("emailVerify", true) : null;
	next();
});

export const User =
	mongoose.models[USER_TABLE] || mongoose.model(USER_TABLE, schema);
