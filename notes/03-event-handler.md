# Event handler

Event handler define application logic.

After creating an `app instance`, you can start defining your application logic using event handlers.

An event handler is a `function` that receive an `Event` instance and returns a `response`.

**`Define event handlers:`**

You can define event handlers using `defineEventHandler` or `eventHandler` utilities:

```ts
import {defineEventHandler} from "h3";

defineEventHandler((event) => {
	return "Response";
});

// The callback function can be sync or async:

defineEventHandler(async (event) => {
	return "Response";
});
```

<br />

**`Object syntax:`**

```ts
// You can use an object syntax in defineEventHandler for more flexible options.

defineEventHandler({
	onRequest: [],
	onBeforeResponse: [],
	handler: (event) => {
		return "Response";
	},
});
```

<br />

**`Response type:`**

- JSON : json serializable vlaue
- String : Sent as-is using default `application/html` content-type.
- null : h3 with end response with 204 - No Content status code.
- Web `ReadableStream` or node `Readable`
- Web `ArrayBuffer` or node `Buffer`
- Web Fetch Response
- `Error`: It's supported but recommended to throw errors instead of returning them using createError utility.

```ts
// JSON response.

defineEventHandler((event) => {
	return {
		user: {
			name: "PK",
			email: "abc@gmail.com",
		},
	};
});

// html response
defineEventHandler(async (event) => {
	return "<h1>Hello world!</h1>";
});

// Promise response
defineEventHandlers(async (event) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({url: event.node.req.url});
		}, 1000);
	});
});

// string response
defineEventHandler(async (event) => {
	return "Response";
});

// no content found 204
defineEventHandler(async (event) => {
	return null;
});

// not found 404
defineEventHandler(async (event) => {
	return;
});

defineEventHandler(async (event) => {
	return undefine;
});

// error
defineEventHandler(async (event) => {
	throw createError({
		status: 400,
		message: "Somting went wrong",
	});
});
// This will end the request with 400 - Bad Request status code and the following JSON response:

// internal errors
// Do NOT do this and use createError()!
defineEventHandler((event) => {
	throw new Error("Something went wrong");
});
// h3 will automatically catch as a 500 - Internal Server Error status response considering it an unhandled error.
```

<br />

**`Lazy event handlers:`**

You can define lazy event handlers using `defineLazyEventHandler` or `lazyEventHandler` utilities.

This allow you to define some one-time logic that will be executed only once when the first request matching the route is received.

`Note:`

A lazy event handler must return an event handler:

```ts
import {defineLazyEventHandler} from "h3";

app.use(
	defineLazyEventHandler(() => {
		console.log("This will be executed only once");
		// This will be executed only once
		return defineEventHandler((event) => {
			// This will be executed on every request
			return "Response";
		});
	}),
);

// This is useful to define some one-time logic such as configuration, class initialization, heavy computation, etc.
```

<br />

**`Middleware`**

Event handlers that don't return any value act as `middleware`.

They can be used to add side effects to your application such as `logging`, caching, etc or to modify the request or response.

```ts
defineEventHandler((event) => {
	console.log(`Middleware. Path: ${event.path}`);
});

// you can define as much middleware as you need. They will be called in order of registration.
```

<br />

**`Convert to h3 handler`**

There are situations that you might want to convert an event handler or utility made for Node.js or another framework to h3.

`Converting from node.js handlers`

There are situations that you might want to convert an `event handler` or utility made for `Node.js` or `another framework` to `h3`.

```ts
import {createApp, fromNodeMiddleware} from "h3";

import exampleMiddleware from "example-node-middleware";

export const app = createApp();

app.use(fromNodeListener(exampleMiddleware()));
```

<br />

`Converting from Web handlers`

You can convert a fetch-like function `(with Request => Response signuture)` into an `h3` event handler using `fromWebHandler` util.

```ts
import {webHandler} from "web-handler"; // This package doesn't exist, it's just an example
import {createApp, fromWebHandler} from "h3";

export const app = createApp();

app.use(fromWebHandler(webHandler));
```
