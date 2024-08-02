/**
 * This class is an empty Keychain implementation for browsers.
 * It exists only to provide an equivalent class to node.
 * @example
 * // Import this class as `Keychain`.
 * // If you use a bundler such as Webpack, this implementation will be automatically selected.
 * import { Keychain } from '@pinemz/safe-storage'
 * @summary Keychain implementation for browsers
 * @since 1.0.0
 */
class KeychainBrowser {
  constructor(service, account) {
  }

  /**
   * aaa
   *
   * @returns {Promise<string|null>} Promise that always resolves to null
   */
  async getPassword() {
      return null
  }

  async getOrCreatePassword() {
    throw new Error('Not supported by browser')
  }
}

export { KeychainBrowser }
