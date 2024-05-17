import {createStorage} from "unstorage";
import fs from "unstorage/drivers/fs";
const storage = createStorage({
	driver: fs({}),
});

export {storage};
