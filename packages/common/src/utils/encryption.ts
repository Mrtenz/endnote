import { createCipheriv, createDecipheriv, createHmac, pbkdf2, randomBytes } from 'crypto';
import { getPasswordFromHash } from './passwords';

const AES_ALGORITHM = 'aes-256-cbc';
const HASH_ALGORITHM = 'sha512';

/**
 * Deterministically generate a 512-bit key from a password. Returns the key as Buffer.
 *
 * @param {string} password
 * @param {string} salt
 * @return {Promise<Buffer>}
 */
export const generateKey = (password: string, salt: string): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    pbkdf2(password, salt, 100000, 64, HASH_ALGORITHM, (error, key) => {
      if (error) {
        return reject(error);
      }

      resolve(key);
    });
  });
};

/**
 * Encrypt the content with the key, using the AES algorithm. The key should be 512 bits in size.
 *
 * @param {string} content
 * @param {Buffer} key
 * @param {Buffer} [iv]
 * @return {Promise<Buffer>}
 */
export const encrypt = async (
  content: string,
  key: Buffer,
  iv?: Buffer
): Promise<{
  iv: Buffer;
  cipher: Buffer;
  hmac: Buffer;
}> => {
  const aesKey = key.slice(0, 32);
  const macKey = key.slice(32, 64);
  iv = iv ?? randomBytes(16);

  const cipher = createCipheriv(AES_ALGORITHM, aesKey, iv);
  const contentBuffer = Buffer.concat([cipher.update(content, 'utf8'), cipher.final()]);

  const hmac = createHmac(HASH_ALGORITHM, macKey);
  hmac.update(Buffer.concat([iv, contentBuffer]));
  const hmacBuffer = hmac.digest();

  return {
    iv,
    cipher: contentBuffer,
    hmac: hmacBuffer
  };
};

/**
 * Decrypt the content with the key, using the AES algorithm. The key should be 512 bits in size.
 *
 * @param {Buffer} cipher
 * @param {Buffer} key
 * @param {Buffer} iv
 * @return {Promise<string>}
 */
export const decrypt = async (cipher: Buffer, key: Buffer, iv: Buffer): Promise<string> => {
  const aesKey = key.slice(0, 32);

  const decipher = createDecipheriv(AES_ALGORITHM, aesKey, iv);
  const contentBuffer = Buffer.concat([decipher.update(cipher), decipher.final()]);

  return contentBuffer.toString('utf8');
};

/**
 * Check if the HMAC for the content matches the expected HMAC.
 *
 * @param {Buffer} cipher
 * @param {Buffer} key
 * @param {Buffer} iv
 * @param {Buffer} mac
 * @return {Promise<boolean>}
 */
export const verifyHmac = async (cipher: Buffer, key: Buffer, iv: Buffer, mac: Buffer): Promise<boolean> => {
  const macKey = key.slice(32, 64);

  const hmac = createHmac(HASH_ALGORITHM, macKey);
  hmac.update(Buffer.concat([iv, cipher]));
  const hmacBuffer = hmac.digest();

  return hmacBuffer.compare(mac) === 0;
};

/**
 * Attempt to decrypt the cipher and verify the HMAC. Throws an error if the cipher could not be decrypted, or if the
 * HMAC is invalid.
 *
 * @param {string} hash
 * @param {Buffer} cipher
 * @param {Buffer} iv
 * @param {Buffer} mac
 * @return {Promise<string>}
 */
export const decryptAndVerify = async (hash: string, cipher: Buffer, iv: Buffer, mac: Buffer): Promise<string> => {
  const { password, salt } = getPasswordFromHash(hash);
  const key = await generateKey(password, salt);

  const isValid = await verifyHmac(cipher, key, iv, mac);
  if (!isValid) {
    throw new Error('HMAC verification failed');
  }

  try {
    return decrypt(cipher, key, iv);
  } catch {
    throw new Error('Failed to decrypt the cipher');
  }
};
