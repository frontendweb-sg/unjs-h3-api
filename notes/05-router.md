# Router

Split your application using `routes`.

Using `h3` router allows more advanced and convenient routing system such as `parameters` and `HTTP methods` while the app instance itself only allows static prefix matching.

**`Create a router`**

For create a router you need to import `createRouter` from `h3`

```ts

const {createApp,createRouter, defineEventHandler} from 'h3'

const app = createApp()


// middleware
app.use(defineEventHandler((event)=>{
    console.log(" I am middleware ")
}))

// create route
const router = createRotuer();

// register a route
router.get('/user',defineEventHandler((event)=>{
    return {
        name:"PK",
        age:30,
        email:"abc@gmail.com"
    }
}))

router.post('/user',defineEventHandler((event)=>{
    const body = await readBody(event)
    return body // returning body
}))

// attach route to app instance
app.use(router)

// export app instance
export {app}

// more about multiple route handling see the src folder

```

<br />

**`Route params`**

You can define parameters in your routes using : prefix

`Example:`

```ts
router.get(
	"/post/:postId",
	defineEventHandler((event) => {
		// there are two ways to access route params

		// using event.context object
		const param = event.context.params.postId;
		// or

		// using getRouterParam(event) or getRouterParams(event,paramName)
		const param1 = getRouterParam(event);

		// or

		const param1 = getRouterParams(event, "postId");

		return `Hello ${param} - ${param1}!`;
	}),
);
```

<br />

**`Wildcard matcher`**

Instead of named params, you can use `*` for `unnamed`

`Example:`

```ts
router.get(
	"/hello/*",
	defineEventHandler((event) => {
		return `Hello ${event.context.params._}!`;
	}),
);

// This will match both /hello and sub routes such as `/hello/world` or `/hello/123`. But it will only match one level of sub routes.

// You can access to the wildcard content using `event.context.params._` where `_` is a string containing the wildcard content.

// If you need to match multiple levels of sub routes, you can use ** prefix:

router.get(
	"/hello/**",
	defineEventHandler((event) => {
		return `Hello ${event.context.params._}!`;
	}),
);

// This will match /hello, /hello/world, /hello/123, /hello/world/123, etc.
```

<br />

**`Nested Routers`**

You can nest `routers` to create a tree of `routers`. This is useful to split your application into multiple parts like the API and the website.

`Example:`

```ts
import {createApp, createRouter, defineEventHandler, useBase} from "h3";

export const app = createApp();

const websiteRouter = createRouter().get(
	"/",
	defineEventHandler((event) => {
		return "Hello world!";
	}),
);

const apiRouter = createRouter().get(
	"/hello",
	defineEventHandler((event) => {
		return "Hello API!";
	}),
);

websiteRouter.use("/api/**", useBase("/api", apiRouter.handler));

app.use(websiteRouter);
```

We create two routers. The first one, called `websiteRouter` is the main one. The second one, we create a second router called `apiRouter`.

`useBase` is used to add a prefix to each routes of the router. In this example, we add `/api` prefix to each routes of the apiRouter. So, the route `/`hello will be `/api/hello`.
