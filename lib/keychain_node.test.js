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
  expect(keychain.getPassword()).resolves.toBeNull()

  await keytar.setPassword(service, account, 'password')
  expect(keychain.getPassword()).resolves.toEqual('password')

  await keytar.setPassword(service, account, 'password2')
  expect(keychain.getPassword()).resolves.toEqual('password2')
})

