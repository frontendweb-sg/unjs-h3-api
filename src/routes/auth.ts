import {createRouter} from "h3";
import {signIn, signUp} from "../controllers/auth";

const route = createRouter();

route.post("/", signIn);
route.post("/signup", signUp);

export {route as userRoute};
