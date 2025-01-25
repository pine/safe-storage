import keytar from 'keytar'
import { uint8ArrayToHex } from 'uint8array-extras'
import { KeychainNode } from './keychain_node.js'


const service = '@pinemz/safe-storage'
let account

beforeEach(() => {
  const accountBytes = new Uint8Array(16)
  globalThis.crypto.getRandomValues(accountBytes)

  account = 'jest_' + uint8ArrayToHex(accountBytes)
})

afterEach(async () => {
  await keytar.deletePassword(service, account)
})


test('getPassword()', async () => {
  const keychain = new KeychainNode(service, account)
  expect(await keychain.getPassword()).toBeNull()

  await keytar.setPassword(service, account, 'password')
  expect(await keychain.getPassword()).toEqual('password')

  await keytar.setPassword(service, account, 'password2')
  expect(await keychain.getPassword()).toEqual('password2')
})


test('getOrCreatePassword()', async () => {
  const keychain = new KeychainNode(service, account)

  // No passwords saved
  expect(await keychain.getPassword()).toBeNull()

  // #addRandomPasswordToKeychain creates a new password
  const password1 = await keychain.getOrCreatePassword()
  expect(password1).toEqual(expect.any(String))
  expect(password1).toHaveLength(24) // 22 characters (128 bit / 6) + 2 padding

  // The same password should be obtained
  const password2 = await keychain.getOrCreatePassword()
  expect(password2).toEqual(password1)
})
