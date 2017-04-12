# Output File Atomically

Write a file in an atomic fashion and create its ancestor directories if needed.

## Installation

```sh
npm install --save output-file-atomically
```

## Usage

```js
const outputFileAtomically = require('output-file-atomically')

outputFileAtomically('path/to/file.txt', 'Hello, World!')
  .then(() => console.log('File created!'))
```

## API

### `outputFileAtomically(filename, data[, options]) => Promise`

* filename **String**
* data **String** | **Buffer**
* options **Object**
  * chown **Object**
    * uid **Number**
    * gid **Number**
  * encoding **String** | **Null** default = 'utf8'
  * mode **Number** default = 438 (aka 0666 in Octal)

Atomically and asynchronously writes `data` to a file, replacing the file if it already exists. `data` can be a string or a buffer.

The file is initially named `filename + "." + murmurhex(__filename, process.pid, ++invocations)`. If `writeFile` completes successfully then, if passed the **chown** option it will change the ownership of the file. Finally it renames the file back to the filename you specified. If it encounters errors at any of these steps it will attempt to unlink the temporary file and then reject the returned promise.

If provided, the **chown** option requires both **uid** and **gid** properties or else the returned promise will be rejected with an error.

The **encoding** option is ignored if **data** is a buffer. It defaults to `'utf8'`.
