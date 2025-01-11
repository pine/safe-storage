import { SafeStorage } from './safe_storage.js'

test('encrypt and decrypt', async () => {
  const safeStorage = new SafeStorage('password')
  const encrypted1 = await safeStorage.encryptString('foo')
  const encrypted2 = await safeStorage.encryptString('foo')
  const encrypted3 = await safeStorage.encryptString('bar')
  const encrypted4 = await safeStorage.encryptString('')

  expect(encrypted1).not.toBe(encrypted2)
  expect(encrypted4).not.toBe('')

  const decrypted1 = await safeStorage.decryptString(encrypted1)
  const decrypted2 = await safeStorage.decryptString(encrypted2)
  const decrypted3 = await safeStorage.decryptString(encrypted3)
  const decrypted4 = await safeStorage.decryptString(encrypted4)

  expect(decrypted1).toBe('foo')
  expect(decrypted2).toBe('foo')
  expect(decrypted3).toBe('bar')
  expect(decrypted4).toBe('')
})

test('decryption failed: wrong password', async () => {
  const safeStorage1 = new SafeStorage('password1')
  const safeStorage2 = new SafeStorage('password2')

  const encrypted1 = await safeStorage1.encryptString('foo')
  const encrypted2 = await safeStorage2.encryptString('foo')

  expect(encrypted1).not.toBe('')
  expect(encrypted2).not.toBe('')
  expect(encrypted1).not.toBe(encrypted2)

  const err = 'Decryption failed. SubtleCrypto#decrypt threw an exception. SafeStorage password may be incorrect.'
  expect(() => safeStorage1.decryptString(encrypted2)).rejects.toThrow(err)
  expect(() => safeStorage2.decryptString(encrypted1)).rejects.toThrow(err)
})
