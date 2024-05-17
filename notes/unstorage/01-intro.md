# Unstorage

Universal key-value

Unified key-value storage api with conventional features and 20+ build-in driver

We usually choose one or more storage backends based on our use cases, such as the filesystem, a database, or LocalStorage for browsers.

**`Installation`**

```ts
npm install unstorage
```

**`Usas`**

```ts
import {createStorage} from "unstorage";

const storage = craeteStorage({
	// options
	driver: "", // memory,fs, database
});

export {storage};
```

<br />

**`Interface`**

- `hasItem(key,opts?)`

  Checks if storage contains a key. Resolves to either true or false.

  `Example:`

  ```ts
  await storage.hasItem("foo:bar");

  // you can also use the .has alias

  await storage.has("foo:bar");
  ```

- `getItem(key,opts?)`

  Gets the value of a key in storage. Resolves to either a JavaScript primitive value or undefined.

  `Example:`

  ```ts
  await storage.getItem("foo:bar");

  // you can also use the .get alias

  await storage.get("foo:bar");
  ```

- `getItems(key,opts?)`

  (Experimental) Gets the value of multiple keys in storage in parallel.

  Each item in the array can either be a string or an object with { key, options? } format.

  Returned value is a Promise resolving to an array of objects with { key, value } format.

  `Example:`

  ```ts

  ```

- `getRawItem(key,opts?)`

  Note: This is an experimental feature. Please check unjs/unstorage#142 for more information.

  Gets the value of a key in storage in raw format.

  `Example:`

  ```ts
  // Value can be a Buffer, Array or Driver's raw format
  const value = await storage.getItemRaw("foo:bar.bin");
  ```

- `setItem(key, value, opts?)`

  If the value is not a string, it will be stringified.

  If the value is undefined, it is same as calling removeItem(key).

  `Example:`

  ```ts
  await storage.setItem("foo:bar", "baz");

  //You can also use the set alias:
  await storage.set("foo:bar", "baz");
  ```

- `setItems(key, value, opts?)`

  (Experimental) Add/Update items in parallel to the storage.

  Each item in items array should be in { key, value, options? } format.

  Returned value is a Promise resolving to an array of objects with { key, value } format.

  `Example:`

  ```ts

  ```

  - `setItemRaw(key, value, opts?)`

  Note: This is an experimental feature. Please check unjs/unstorage#142 for more information.

  Add/Update a value to the storage in raw format.

  If value is undefined, it is the same as calling removeItem(key).

  `Example:`

  ```ts
  await storage.setItemRaw("data/test.bin", new Uint8Array([1, 2, 3]));

  // Remove a value (and it's meta) from storage.
  await storage.removeItem("foo:bar", {removeMeta: true});
  // same as await storage.removeItem("foo:bar", true);

  // You can also use the del or remove aliases:
  await storage.remove("foo:bar");
  await storage.del("foo:bar");
  ```
