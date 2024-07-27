# safe-storage
> Electron-like encryption/decryption API for Node and browsers

## Features

- Only ESM is supported as a module system (CJS is not supported)
- Supports Node.js and modern browsers
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

Finally, use the encrypted text in your program:
```js
TODO
```

## CLI Specifications
TODO

## API Specifications
TODO

## FAQ
TODO

## License
MIT &copy; Pine Mizune
