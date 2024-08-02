import { uint8ArrayToBase64 } from 'uint8array-extras'
import keytar from 'keytar'

/**
 * macOS Keychain utilities for Node.js
 * @example
 * // Import this class as `Keychain`.
 * // If you use Node.js, this implementation will be automatically selected.
 * import { Keychain } from '@pinemz/safe-storage'
 *
 * @see {@link https://github.com/chromium/chromium/blob/128.0.6597.1/components/os_crypt/sync/keychain_password_mac.mm}
 */
class KeychainNode {
  constructor(service, account) {
    this.service = service
    this.account = account
  }

  async getPassword() {
    return keytar.getPassword(this.service, this.account)
  }

  async getOrCreatePassword() {
    const password = await keytar.getPassword(this.service, this.account)
    if (password) {
      return password
    }

    return this.#addRandomPasswordToKeychain()
  }

  async #addRandomPasswordToKeychain() {
    const passwordBuf = new Uint8Array(16)
    globalThis.crypto.getRandomValues(passwordBuf)

    const password = uint8ArrayToBase64(passwordBuf)
    passwordBuf.fill(0)

    await keytar.setPassword(this.service, this.account, password)

    return password
  }
}

export { KeychainNode }