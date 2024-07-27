export declare class Keychain {
  constructor(service: string, account: string)
  async getOrCreatePassword(): string
}

export declare class SafeStorage {
  constructor(password: string)
  async encryptString(plainText: string): string
  async decryptString(encrypted: string): string
}
