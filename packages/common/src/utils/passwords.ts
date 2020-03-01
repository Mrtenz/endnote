import { randomBytes } from 'crypto';

/**
 * Generate a random password. Returns the password as hexadecimal string.
 *
 * @param {number} length
 * @return {string}
 */
export const generatePassword = (length: number = 8): string => {
  const bytes = randomBytes(length);
  return bytes.toString('hex');
};

/**
 * Get the password and salt from `location.hash`.
 *
 * @param {string} hash
 * @return {{ password: string, salt: string }}
 */
export const getPasswordFromHash = (hash: string): { password: string; salt: string } => {
  if (hash.startsWith('#')) {
    hash = hash.substring(1);
  }

  if (hash.length !== 32) {
    throw new Error(`Invalid hash: expected 32 characters, but got ${hash.length} characters`);
  }

  return {
    password: hash.substring(0, 16),
    salt: hash.substring(16, 32)
  };
};
