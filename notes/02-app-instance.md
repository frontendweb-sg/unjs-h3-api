# App instance

The core of a h3 server is an `app instance`. It is the core of the server that handles incoming requests.

**`initialize an app`**
You can create a new h3 app instance using createApp utility:

```js
import {createApp} from "h3";

const app = createApp();
```

<br />

**`Setting global options`**

You can pass global app configuration when initializing an app.

`Example:` create an app with verbose logging enabled.

```js
const app = createApp({
	debug: true,
});
```

<br />

**`Setting global hooks`**

- `onError`
- `onBeforeResponse`
- `onAfterResponse`
- `onRequest`

`Note:` These hooks are called for every request and can be used to add global logic to your app such as logging, error handling.

```ts
const app = createApp({
	onError: (error) => {
		console.error(error);
	},
	onRequest: (event) => {
		console.log("Request:", event.path);
	},
});
```

<br />

**`Register event handlers`**

You can register event handlers to `app instance` using the app.use

```ts
import {defineEventHandler} from "h3";

app.use(
	"/",
	defineEventHandler((event) => {
		return "Hello world!";
	}),
);
```

This will register the event handler to the `app instance` and will be called for every request starting with the prefix "/".

> Using an empty return or return `undefined` make a 404 Not Found status response.
> Also using return null will make a 204 No Content status response.

<br />

**`Event handler options`**

The method use accepts an optional options object as third argument:

```ts
app.use(
	"/hello",
	defineEventHandler((event) => {
		return "Hello world!";
	}),
	{
		// Options
	},
);
```

`matcher`

You can define a custom matcher function to have more advanced logic for matching requests but simple than a router

`Example:` you can match only odd URLs, /1, /3, /5, etc.:

```ts
app.use(
	"/hello",
	defineEventHandler((event) => {
		return "Hello world!";
	}),
	{
		match: (url) => url.substr(1) % 2,
	},
);
```

`Note:` Do not use the custom matcher as a router. It is not designed for that purpose. Use a router instead.

<br />

`lazy`:

You can provide an `async` function that `h3` will load on `first time` a request matching the route is received. It's useful for `dynamic` `imports` to reduce `startup time`.

```ts
app.use("/big", () => import("./big-handler"), {lazy: true});
```

This reduce the startup time because the runtime have less code to load and parse when starting the server.

<br />

**`Internals`**

h3 app instance has some additional properties.

- `app.stack`: An ordered array of currently registered event handlers.
  Each item has route and handler properties.
- `app.options`: Global options object provided when initializing the app.
- `app.handler`: Direct stack handler function (unsafe to directly call).
