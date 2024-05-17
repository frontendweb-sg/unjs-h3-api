# Request

Utilities to access incoming request.

- `assertMethod(event, expected, allowHead?)`

  Asserts that the incoming request method is of the expected type using `isMethod`

  `Example:`

  ```ts
  export default defineEventHandler((event) => {
  	assertMethod(event, "GET");
  	// Handle GET request, otherwise throw 405 error
  });

  // If allowHead is true, it will allow HEAD requests to pass if the expected method is GET.
  ```

  <br />

- `getHeader(event, name)`

  Get a request header by name.

  `Example:`

  ```ts
  export default defineEventHandler((event) => {
  	const contentType = getRequestHeader(event, "content-type");
  	// "application/json"
  });
  ```

  <br />

- `getHeaders(event, name)`

  Get the request headers object.

  `Example:`

  ```ts
  export default defineEventHandler((event) => {
  	const headers = getRequestHeaders(event);

  	// { "content-type": "application/json", "x-custom-header": "value" }
  });
  ```

  <br />

- `getQuery(event)`

  Get query the params object from the request URL parsed with [unjs/ufo](https://github.com/unjs/ufo).

  `Example:`

  ```ts
  export default defineEventHandler((event) => {
  	const query = getQuery(event);

  	// { key: "value", key2: ["value1", "value2"] }
  });
  ```

  <br />

- `getRequestHeader(event, name)`

  Get a request header by name.

  `Example:`

  ```ts
  export default defineEventHandler((event) => {
  	const contentType = getRequestHeader(event, "content-type");

  	// "application/json"
  });
  ```

  <br />

- `getRequestHeaders(event, name)`

  Get the request headers object. Array headers are joined with a comma.

  `Example:`

  ```ts
  export default defineEventHandler((event) => {
  	const headers = getRequestHeaders(event);

  	// { "content-type": "application/json", "x-custom-header": "value" }
  });
  ```

  <br />

- `getRequestHost(event, opts: { xForwardedHost? })`

  Get the request hostname.

  If `xForwardedHost` is true, it will use the x-forwarded-host header if it exists.

  If no host header is found, it will default to "localhost".

  `Example:`

  ```ts
  export default defineEventHandler((event) => {
  	const host = getRequestHost(event); // "example.com"
  });
  ```

  <br />

- `getRequestIP(event)`

  Try to get the client IP address from the incoming request.

  If `xForwardedFor` is `true`, it will use the `x-forwarded-for` header if it exists.

  If IP cannot be determined, it will default to `undefined`.

`Example:`

```ts
export default defineEventHandler((event) => {
	const ip = getRequestIP(event); // "192.0.2.0"
});
```

<br />

- `getRequestProtocol(event, opts: { xForwardedProto? })`
  Get the request protocol.

  If `x-forwarded-proto` header is set to `"https"`, it will return "https". You can disable this behavior by setting `xForwardedProto` to false.

  If protocol cannot be determined, it will default to "http".

  `Example:`

  ```ts
  export default defineEventHandler((event) => {
  	const protocol = getRequestProtocol(event); // "https"
  });
  ```

  <br />

- `getRequestURL(event, opts: { xForwardedHost?, xForwardedProto? })`

  Generated the full incoming request URL using `getRequestProtocol`, `getRequestHost` and event.path.

  If `xForwardedHost` is true, it will use the x-forwarded-host header if it exists.

  If `xForwardedProto` is false, it will not use the x-forwarded-proto header.

  `Example:`

  ```TS
  export default defineEventHandler((event) => {
  const url = getRequestURL(event); // "https://example.com/path"
  });
  ```

  <br />

- `getRouterParam(event, name, opts: { decode? })`

  Get a matched route param by name.

  If decode option is true, it will decode the matched route param using decodeURI.

  `Example:`

```ts
export default defineEventHandler((event) => {
	const param = getRouterParam(event, "key");
});
```

<br />

- `getRouterParams(event, opts: { decode? })`

  Get matched route params.

  If decode option is true, it will decode the matched route params using
  decodeURI.

  `Example:`

  ```ts
  export default defineEventHandler((event) => {
  	const params = getRouterParams(event); // { key: "value" }
  });
  ```

- `getValidatedQuery(event, validate)`

  Get the query param from the request URL parsed with unjs/ufo and validated with validate function.

  You can use a simple function to validate the query object or a library like zod to define a schema.

  `Example:`

  ```ts
  export default defineEventHandler((event) => {
  	const query = getValidatedQuery(event, (data) => {
  		return "key" in data && typeof data.key === "string";
  	});
  });
  ```

  `Example:`

  ```ts
  import {z} from "zod";
  export default defineEventHandler((event) => {
  	const query = getValidatedQuery(
  		event,
  		z.object({
  			key: z.string(),
  		}),
  	);
  });
  ```

- `getValidatedRouterParams(event, validate, opts: { decode? })`

  Get matched route params and validate with validate function.
  If decode option is true, it will decode the matched route params using decodeURI.

  You can use a simple function to validate the params object or a library like zod to define a schema.

  `Example:`

  ```ts
  export default defineEventHandler((event) => {
  	const params = getValidatedRouterParams(event, (data) => {
  		return "key" in data && typeof data.key === "string";
  	});
  });
  ```

  `Example:`

  ```ts
  import {z} from "zod";
  export default defineEventHandler((event) => {
  	const params = getValidatedRouterParams(
  		event,
  		z.object({
  			key: z.string(),
  		}),
  	);
  });
  ```

isMethod(event, expected, allowHead?)
Checks if the incoming request method is of the expected type.
If allowHead is true, it will allow HEAD requests to pass if the expected method is GET.
Example:

export default defineEventHandler((event) => {
if (isMethod(event, "GET")) {
// Handle GET request
} else if (isMethod(event, ["POST", "PUT"])) {
// Handle POST or PUT request
}
});
toWebRequest(event)
Convert the H3Event to a WebRequest object.
NOTE: This function is not stable and might have edge cases that are not handled properly.
getRequestFingerprint(event, opts)
Get a unique fingerprint for the incoming request.
Body utils
getRequestWebStream(event)
Captures a stream from a request.
readBody(event, options: { strict? })
Reads request body and tries to safely parse using destr.
Example:

export default defineEventHandler(async (event) => {
const body = await readBody(event);
});
readFormData(event)
Constructs a FormData object from an event, after converting it to a a web request.
Example:

export default defineEventHandler(async (event) => {
const formData = await readFormData(event);
const email = formData.get("email");
const password = formData.get("password");
});
readMultipartFormData(event)
Tries to read and parse the body of a an H3Event as multipart form.
Example:

export default defineEventHandler(async (event) => {
const formData = await readMultipartFormData(event);
// The result could look like:
// [
// {
// "data": "other",
// "name": "baz",
// },
// {
// "data": "something",
// "name": "some-other-data",
// },
// ];
});
readRawBody(event, encoding)
Reads body of the request and returns encoded raw string (default), or Buffer if encoding is falsy.
Example:

export default defineEventHandler(async (event) => {
const body = await readRawBody(event, "utf-8");
});
readValidatedBody(event, validate)
Tries to read the request body via readBody, then uses the provided validation function and either throws a validation error or returns the result.
You can use a simple function to validate the body or use a library like zod to define a schema.
Example:

export default defineEventHandler(async (event) => {
const body = await readValidatedBody(event, (body) => {
return typeof body === "object" && body !== null;
});
});
Example:

import { z } from "zod";
export default defineEventHandler(async (event) => {
const objectSchema = z.object();
const body = await readValidatedBody(event, objectSchema.safeParse);
});
