# safe-storage
> Electron-like encryption/decryption API for Node and browsers

## Features

- Only ESM is supported as a module system (CJS is not supported)
- Supports Node.js (>= v19.0.0) and modern browsers
- Provides TypeScript type definitions as default

## Getting started
### Install

First, install this package as follows:
```bash
# For npm users
$ npm install --save @pinemz/safe-storage

# For yarn users
$ yarn add @pinemz/safe-storage

# For pnpm users
$ pnpm add @pinemz/safe-storage
```

### Usage
After installation, use the CLI to encrypt any text:

```bash
# Encrypts using a password stored in the OS keychain.
# (If none exists, it will be generated automatically and stored in the OS keychain)
$ safe-storage encrypt -s <service> -a <account> -t <text to encrypt>
```

Finally, decrypt the encrypted text in your script:
```js
import { Keychain, SafeStorage } from '@pinemz/safe-storage'

const keychain = new Keychain('<service>', '<account>')
const safeStorage = new SafeStorage(await keychain.getOrCreatePassword())

const decryptedText = safeStorage.decryptString('<encrypted text>')
console.log(decryptedText)
```

## CLI Specifications
TODO

## API Specifications
TODO

## FAQ
### Q. Is this library only available for macOS?
No, it is also available for Linux and Windows.

This library uses _[keytar](https://www.npmjs.com/package/keytar)_ to access keychain when running on Node.js.
_keytar_ supports not only macOS, but also Linux and Windows.

## License
MIT &copy; Pine Mizune
