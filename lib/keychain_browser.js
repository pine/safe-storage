/**
 * This class is an empty Keychain implementation for browsers.
 * It exists only to provide an equivalent class to node.
 */
class KeychainBrowser {
  /**
   * Create an empty Keychain implementation
   *
   * @param {string} service The service name
   * @param {string} account The account name
   * @example
   * // Import this class as `Keychain`.
   * // If you use a bundler such as Webpack, `KeychainBrowser` will be automatically selected.
   * import { Keychain } from '@pinemz/safe-storage'
   *
   * const keychain = new Keychain('service', 'account')
   * console.log(await keychain.getPassword())
   */
  constructor(service, account) {
  }

  /**
   * A method that always returns null as the password
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
