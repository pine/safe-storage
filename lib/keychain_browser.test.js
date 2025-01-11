import { KeychainBrowser } from './keychain_browser.js'


test('not supported by browser()', () => {
  const keychain = new KeychainBrowser('service', 'account')

  expect(() => keychain.getPassword())
    .rejects.toThrow('Not supported by browser')
  expect(() => keychain.getOrCreatePassword())
    .rejects.toThrow('Not supported by browser')
})
