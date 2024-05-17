import {config} from "dotenv";
config({path: ".env"});
import {createApp, defineEventHandler, defineLazyEventHandler} from "h3";
import {authRoute} from "./routes/auth";
import {connectDb} from "./db";
import {storage} from "./utils/storage";

const app = createApp({
	debug: false,
});

// middleware
app.use(
	defineLazyEventHandler(async () => {
		await connectDb();

		let token = await storage.hasItem("users:token");
		if (!token) {
			await storage.setItem("users:token", "hello");
		}
		return defineEventHandler(async (event) => {
			const clientAddress = event.context.clientAddress;
			const params = event.context.params;
			const matchedRoute = event.context.matchedRoute;
			const sessions = event.context.sessions;

			if (token) {
				event.context.user = await storage.getItem("users:token");
			}
			console.log(
				"I am middleware",
				clientAddress,
				params,
				matchedRoute,
				sessions,
			);
		});
	}),
);

// route
app.use("/api/auth", authRoute.handler);

app.use(
	"/api",
	defineEventHandler((event) => {
		return {
			version: "1.0.0",
		};
	}),
);
// export app
export {app};
