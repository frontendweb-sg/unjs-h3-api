import {createStorage} from "unstorage";
import fs from "unstorage/drivers/fs";
const storage = createStorage({
	driver: fs({
		base: "./cache",

		// cache is the directory create in the root where all the item will store in it
		// await storage.setItem('users:token',token);
		// will store "cache/users/token"
		// token is file
	}),
});

export {storage};
