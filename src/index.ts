import {config} from "dotenv";
config({path: ".env"});
import {createApp, defineEventHandler} from "h3";
import {authRoute} from "./routes/auth";
import {connectDb} from "./db";

const app = createApp();

connectDb();

// middleware
app.use(
	defineEventHandler((event) => {
		console.log("I am middleware");
	}),
);

// route
app.use("/api/auth", authRoute.handler);
// export app
export {app};
