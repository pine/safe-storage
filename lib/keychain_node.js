import { uint8ArrayToBase64 } from 'uint8array-extras'
import keytar from 'keytar'

/**
 * macOS Keychain utilities for Node.js
 *
 * @see [chromium/components/os_crypt/sync/keychain_password_mac.mm]{@link https://github.com/chromium/chromium/blob/128.0.6597.1/components/os_crypt/sync/keychain_password_mac.mm}
 */
class KeychainNode {
  /**
   * Create an empty Keychain implementation
   *
   * @param {string} service Service name
   * @param {string} account Account name
   * @since 0.1.0
   * @example
   * // Import this class as `Keychain`.
   * // If you use Node.js, `KeychainNode` will be automatically selected.
   * import { Keychain } from '@pinemz/safe-storage'
   */
  constructor(service, account) {
    this.service = service
    this.account = account
  }

  /**
   * Get password stored in Keychain
   *
   * @returns {Promise<string|null>} Promise that resolves with the password string, if a password has been stored, otherwise Promise that resolves with null.
   * @since 1.0.0
   * @example
   * import { Keychain } from '@pinemz/safe-storage'
   *
   * const keychain = new Keychain('myService', 'safeStorage')
   * const password = await keychain.getPassowrd()
   *
   * // Here, `password` may be a null string.
   * console.log(password)
   */
  async getPassword() {
    return keytar.getPassword(this.service, this.account)
  }

  /**
   * Get password from Keychain, if none is saved generate new one and save
   *
   * @returns {Promise<string>} Promise that resolves with the password string
   * @since 0.1.0
   * @example
   * import { Keychain } from '@pinemz/safe-storage'
   *
   * const keychain = new Keychain('myService', 'safeStorage')
   * const password = await keychain.getOrCreatePassword()
   *
   * // Here, `password` is always a non-null string.
   * console.log(password)
   */
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
