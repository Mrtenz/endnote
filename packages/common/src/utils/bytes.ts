import { TextEncoder } from 'util';

/**
 * Returns the length of a string in bytes. This takes special characters (like emoji) into account.
 *
 * @param {string} text
 * @return {number}
 */
export const getByteLength = (text: string): number => {
  return new TextEncoder().encode(text).length;
};
