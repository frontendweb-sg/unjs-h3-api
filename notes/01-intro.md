# What is h3 framework?

It is `lightweight` and `composable` server framework for `javascript` that is designed to work with various javascript `runtimes` through `adapters`.

**`Quick Start`**

- Create new folder
- Open folder in vs-code or any editor
- `npm init -y`
- `npm install h3`
- create src/index.ts (root file)
- set script `npx --yes listhen -w --open ./src/index.ts`

**`Create server`**

```ts
import {createApp} from "h3";

// crate an app instance
const app = createApp();

// app is a tiny server capable of matching requests, generating response and handling lifecycle hook

app.use(
	"/",
	defineEventHandler(() => {
		return {
			message: "hello world",
		};
	}),
);

// here, i have craeted an end point, sending 'hello world' message in response
// no route added here.

export {app};
```

Now run the development server using [unjs/listhen](https://listhen.unjs.io/):

```js
npx --yes listhen -w --open ./app.ts
```
