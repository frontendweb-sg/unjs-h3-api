# Event Object

Event object carries an incoming request and context.

Every time a new `HTTP` request comes, `h3` internally creates an `Event object` and passes it though event handlers until sending the `response`.

`Example:`

```ts
import {defineEventHandler, getQuery, readBody} from "h3";

app.use(
	defineEventHandler((event) => {
		// Log event. `.toString()` stringifies to a simple string like `[GET] /<path>`
		console.log(`Request: ${event.toString()}`);

		// Parse query parms
		const query = getQuery(event);

		// Try to read request body
		const body = await readBody(event).catch(() => {});

		// Echo back request as response
		return {
			path: event.path,
			method: event.method,
			query,
			body,
		};
	}),
);
```

<br />

**`Properties`:**

The main properties of an event are:

- `event.node`

  The `event.node` allows you to access the native Node.js request and response. In runtimes other than Node.js/Bun, h3 makes a compatible shim using [`unjs/unenv`](https://github.com/unjs/unenv).

  `Example:`

  ```ts
  defineEventHandler((event) => {
  	event.node.req; // Node.js HTTP Request
  	event.node.res; // Node.js HTTP Response
  });
  ```

- `event.web?`

  If available, an object with `request` and `url` properties to access native web request context.

  `Example:`

  ```ts
  defineEventHandler((event) => {
  	return {
  		web: event.web?,
  	};
  });
  ```

- `event.method`

  Access to the normalized (uppercase) request method.

  `Example:`

  ```ts
  defineEventHandler((event) => {
  	return {
  		method: event.method,
  	};
  });
  ```

- `event.path`

  Access to the request path. `(Example: /test?test=123)`

  - `context` with some context information about the request.
  - `headers` with a normalized version of the headers of the request.
  - `handled` with a boolean that indicates if the request has terminated.

- `event.headers`

  Access to the normalized request Headers.

  `Example:`

  ```ts
  defineEventHandler((event) => {
  	console.log("headers", event.headers);
  });

  // alternatively use getHeader(event), getHeaders(event,name)
  ```

- `event.context`

  The `context` is an object that contains arbitrary information about the request. You can store your custom properties inside `event.context` to share across composable utils.

  `Example:`

  ```ts
  defineEventHandler((event) => {
  	// main context object
  	const context = event.context;

  	// context object contain below methods
  	const clientAddress = event.context.clientAddress;
  	const params = event.context.params;
  	const matchedRoute = event.context.matchedRoute;
  	const sessions = event.context.sessions;

  	console.log("hello", clientAddress, params, matchedRoute, sessions);
  	return {};
  });

  // alternatively use getHeader(event), getHeaders(event,name)
  ```

- `event.handle`

  Specifies if response is already handled or not. Initially for each request it is `false`, and when a response is generated, it is set to `true`.

  `Advanced`: If you manually handle the response, set it to true to tell h3 stop sending any responses.

<br />

**`Methods`**

h3 provides a function to help you to create a `response` before the end of the `request`.

- `event.respondWith`

  The `respondWith` method is used to create a response without ending the `request`.

  You must craft a response using the `Response` constructor.

  `Example`

  ```ts
  defineEventHandler((event) => {
  	await event.respondWith(new Response("Hello World"));
  	return "..."; // DOES NOT WORKS
  });

  app.use(
  	defineEventHandler((event) => {
  		await event.respondWith(new Response("Hello World"));
  		return "..."; // DOES NOT WORK
  	}),
  );
  ```
