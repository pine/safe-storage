export declare class Keychain {
  constructor(service: string, account: string)
  getOrCreatePassword(): Promise<string>
}

export declare class SafeStorage {
  constructor(password: string)
  encryptString(plainText: string): Promise<string>
  decryptString(encrypted: string): Promise<string>
}
