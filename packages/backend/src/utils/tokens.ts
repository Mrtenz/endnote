import { SymmetricKey, V2 } from 'paseto.js';

/**
 * Encrypt a payload as JSON object in a PASETO.
 *
 * @param {T} payload
 * @param {Buffer} key
 * @return {Promise<string>}
 * @template T
 */
export const encryptToken = async <T extends object>(payload: T, key: Buffer): Promise<string> => {
  const symmetricKey = new SymmetricKey(new V2());
  await symmetricKey.inject(key);

  const signer = symmetricKey.protocol();
  return signer.encrypt(JSON.stringify(payload), symmetricKey);
};

/**
 * Decrypt a PASETO with JSON payload. The returned payload is not verified for completeness.
 *
 * @param {string} token
 * @param {Buffer} key
 * @return {Promise<T>}
 * @template T
 */
export const decryptToken = async <T extends object>(token: string, key: Buffer): Promise<T> => {
  const symmetricKey = new SymmetricKey(new V2());
  await symmetricKey.inject(key);

  const signer = symmetricKey.protocol();
  const payload = await signer.decrypt(token, symmetricKey);

  try {
    return JSON.parse(payload);
  } catch {
    throw new Error('Invalid token: failed to parse JSON body');
  }
};
