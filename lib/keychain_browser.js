/**
 * An empty Keychain implementation for browsers
 * <p>
 * It exists only to provide an equivalent class to node.
 */
class KeychainBrowser {
  /**
   * Create an empty Keychain implementation
   *
   * @param {string} service The service name
   * @param {string} account The account name
   * @since 0.1.0
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
   * Browser not supported, always fails to run
   *
   * @returns {Promise<string|null>} Promise that is always rejected
   * @since 0.1.0
   */
  async getPassword() {
    throw new Error('Not supported by browser')
  }

  /**
   * Browser not supported, always fails to run
   *
   * @returns {Promise<string>} Promise that is always rejected
   * @since 0.1.0
   */
  async getOrCreatePassword() {
    throw new Error('Not supported by browser')
  }
}

export { KeychainBrowser }
