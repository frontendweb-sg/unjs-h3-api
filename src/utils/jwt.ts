import {createError} from "h3";
import JWT, {JwtPayload, SignOptions} from "jsonwebtoken";

interface Option extends SignOptions {}

const DEFAULT_OPTIONS: Option = {
	expiresIn: "1h",
};
export class Jwt {
	static genToken(payload: JwtPayload, option: Option = DEFAULT_OPTIONS) {
		return JWT.sign(payload, process.env.SECRET_KEY!, option);
	}
	static verify(token: string) {
		return JWT.verify(token, process.env.SECRET_KEY, (error, decode) => {
			if (error)
				throw createError({
					status: 401,
					message: error.message,
				});
			return decode;
		});
	}
}
