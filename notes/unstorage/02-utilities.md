# Unitities

Unstorage exposes several utilities. You can individually import them and add only the needed bytes to your bundle.

**`Namespace`**

Create a namespaced instance of the main `storage`. All operations are virtually `prefixed`, which is useful for creating shorcuts and limiting access.

`Syntax:`

```ts
prefixStorage(storage, prefix);
```

`Example:`

```ts
import {createStorage, prefixStorage} from "unstorage";

const storage = createStorage();
const assetsStorage = prefixStorage(storage, "assets");

// Same as storage.setItem('assets:x', 'hello!')
await assetsStorage.setItem("x", "hello!");
```

**`Snapshots`**

Takes a snapshot from all keys in the specified base and stores them in a plain JavaScript object (string: string). Base is removed from keys.

`Syntax:`

```ts
snapshot(storage,base?)

// or

restoreSnapshot(storage, data, base?)
```

`Example:`

```ts
import {snapshot} from "unstorage";

const data = await snapshot(storage, "/etc");

// Restore a snapshot created by snapshot()

await restoreSnapshot(storage, {"foo:bar": "baz"}, "/etc2");
```
