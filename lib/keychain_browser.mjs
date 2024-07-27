/**
 * An empty implementation of Keychain for browsers
 */
class Keychain {
  constructor(service, account) {
  }

  async getOrCreatePassword() {
    throw new Error('Not supported by browser')
  }
}

export { Keychain }
