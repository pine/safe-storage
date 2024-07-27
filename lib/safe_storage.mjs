import {
  base64ToUint8Array,
  concatUint8Arrays,
  stringToUint8Array,
  toUint8Array,
  uint8ArrayToBase64,
  uint8ArrayToString,
} from 'uint8array-extras'

const CIPHER_ALGORITHM = 'AES-CBC'
const CIPHER_KEY_LENGTH = 256 // bit
const CIPHER_BLOCK_SIZE = 16 // byte
const DIGEST_ALGORITHM = 'SHA-512'
const KEY_OBTENTION_ITERATIONS = 1000

/**
 * Electron-like encryption/decryption API for Node and browsers
 *
 * The encryption/decryption API was designed with reference to
 * Electron's safeStorage API and chromium implementation.
 * The encryption algorithm used is PBEWithHmacSHA512AndAES_256,
 * which was inspired by Jasypt.
 *
 * @see {@link https://www.electronjs.org/ja/docs/latest/api/safe-storage}
 * @see {@link https://chromium.googlesource.com/chromium/src/+/b30fb281783b701a5b7ad7cbcb7394c48eb516b3/components/os_crypt/sync/os_crypt_mac.mm}
 * @see {@link https://github.com/jasypt/jasypt/blob/jasypt-1.9.3/jasypt/src/main/java/org/jasypt/util/text/AES256TextEncryptor.java}
 * @see {@link https://github.com/jasypt/jasypt/blob/jasypt-1.9.3/jasypt/src/main/java/org/jasypt/encryption/pbe/StandardPBEByteEncryptor.java}
 */
class SafeStorage {
  #password

  constructor(password) {
    this.#password = password
  }

  async encryptString(plainText) {
    const salt = new Uint8Array(CIPHER_BLOCK_SIZE)
    const iv = new Uint8Array(CIPHER_BLOCK_SIZE)
    globalThis.crypto.getRandomValues(salt)
    globalThis.crypto.getRandomValues(iv)

    const key = await this.#deriveKey(salt)
    const encryptedData =
      await globalThis.crypto.subtle.encrypt(
        { name: CIPHER_ALGORITHM, iv },
        key,
        stringToUint8Array(plainText)
      )

    // `encryptedData` is an ArrayBuffer so it needs to be converted.
    const concatenated =
      concatUint8Arrays([ salt, iv, toUint8Array(encryptedData) ])
    return uint8ArrayToBase64(concatenated)
  }

  async decryptString(encrypted) {
    const buf = base64ToUint8Array(encrypted)
    if (buf.length < CIPHER_BLOCK_SIZE * 3) {
      return new Error('The encrypted message is broken: the length is too short.')
    }

    const salt = buf.slice(0, CIPHER_BLOCK_SIZE)
    const iv = buf.slice(CIPHER_BLOCK_SIZE, CIPHER_BLOCK_SIZE * 2)
    const encryptedData = buf.slice(CIPHER_BLOCK_SIZE * 2)

    const key = await this.#deriveKey(salt)
    const decryptedData =
      await globalThis.crypto.subtle.decrypt(
        { name: CIPHER_ALGORITHM, iv },
        key,
        encryptedData,
      )

    return uint8ArrayToString(decryptedData)
  }

  async #deriveKey(salt) {
    const keyMaterial = await globalThis.crypto.subtle.importKey(
      'raw',
      stringToUint8Array(this.#password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    )

    return globalThis.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: KEY_OBTENTION_ITERATIONS,
        hash: DIGEST_ALGORITHM,
      },
      keyMaterial,
      { name: CIPHER_ALGORITHM, length: CIPHER_KEY_LENGTH },
      false,
      ['encrypt', 'decrypt'],
    )
  }
}

export { SafeStorage }
