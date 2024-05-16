declare module NodeJS {
	interface ProcessEnv {
		MONGODB_URI: string;
		SECRET_KEY: string;
	}
}
