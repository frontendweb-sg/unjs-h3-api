# HTTP Server

We can expose unstorage's instance to an HTTP server to allow remote connections.

Request url is mapped to a key and method/body is mapped to a function. See below for supported HTTP methods.

**`Storage Server`**

Programmatic usage of creating an HTTP server exposing methods to communicate with the storage instance:
server.js

`server.js`

```ts
import {listen} from "listhen";
import {createStorage} from "unstorage";
import {createStorageServer} from "unstorage/server";

const storage = createStorage();
const storageServer = createStorageServer(storage, {
	authorize(req) {
		// req: { key, type, event }
		if (req.type === "read" && req.key.startsWith("private:")) {
			throw new Error("Unauthorized Read");
		}
	},
});

// Alternatively we can use `storageServer.handle` as a middleware
await listen(storageServer.handle);
```

`Note:` The `storageServer` is an h3 instance

<br />

**`Storage Client`**

You can use the `http driver` to easily connect to the server.

`Example:`

```ts
import {createStorage} from "unstorage";
import httpDriver from "unstorage/drivers/http";

const client = createStorage({
	driver: httpDriver({
		base: "SERVER_ENDPOINT",
	}),
});
const keys = await client.getKeys();
```

**`HTTP Methods`**

- `GET:` Maps to `storage.getItem` or `storage.getKeys` when the path ends with / or /:
- `HEAD:` Maps to `storage.hasItem`. Returns 404 if not found.
- `PUT:` Maps to `storage.setItem`. Value is read from the body and returns OK if the operation succeeded.
- `DELETE:` Maps to `storage.removeItem` or `storage.clear` when the path ends with / or /:. Returns OK if the operation succeeded.
