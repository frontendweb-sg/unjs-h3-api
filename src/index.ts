import {createApp, defineEventHandler} from "h3";
import {authRoute} from "./routes/auth";

const app = createApp();

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
