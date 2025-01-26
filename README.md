# safe-storage

[![Test](https://github.com/pine/safe-storage/actions/workflows/test.yml/badge.svg)](https://github.com/pine/safe-storage/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/pine/safe-storage/graph/badge.svg?token=mrSLYH77nf)](https://codecov.io/gh/pine/safe-storage)

> Electron-like encryption/decryption API for Node.js and browsers

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
$ safe-storage encrypt -s <service> -a <account> <text to encrypt>
```

Finally, decrypt the encrypted text in your script:
```js
import { Keychain, SafeStorage } from '@pinemz/safe-storage'

const keychain = new Keychain('<service>', '<account>')
const safeStorage = new SafeStorage(await keychain.getOrCreatePassword())

const decryptedText = safeStorage.decryptString('<encrypted text>')
console.log(decryptedText)
```

## References
### CLI

```bash
$ /safe-storage --help
Usage: safe-storage <command> <options> <inputs>

Encryption command:
  Encryption requires -s and -a or -p.
  If you use -s and -a, save your password in your keychain beforehand,
  otherwise a new password will be generated and saved.

  $ safe-storage encrypt -s <service> -a <account> <plainText>
  $ safe-storage encrypt -p <password> <plainText>

Decryption command:
  Decryption requires -s and -a or -p.
  If you use -s and -a, save your password in your keychain beforehand,
  otherwise a new password will be generated and saved.

  $ safe-storage decrypt -s <service> -a <account> <encryptedText>
  $ safe-storage decrypt -p <password> <encryptedText>

Options:
  -s/--service  : Specify keychain service
  -a/--account  : Specify keychain account
  -p/--password : Specify password directly in plain text
  -v/--version  : Show package version
  -h/--help     : Show help
```

## API
- [API Reference](https://pine.github.io/safe-storage/)

## FAQ
### Q. Is this library only available for macOS?
No, it is also available for Linux and Windows.

This library uses _[keytar](https://www.npmjs.com/package/keytar)_ to access keychain when running on Node.js.
_keytar_ supports not only macOS, but also Linux and Windows.

## License
MIT &copy; Pine Mizune
