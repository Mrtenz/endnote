/**
 * Maps a `string -> Buffer` object to a `string -> string` object, where the value is a hexadecimal representation of
 * the Buffer.
 *
 * @param {{ [key in keyof T]: Buffer }} object
 * @return {{ [key in keyof T]: string }}
 * @template T
 */
export const hexifyObject = <T extends object>(object: { [key in keyof T]: Buffer }): { [key in keyof T]: string } => {
  return Object.fromEntries(Object.entries<Buffer>(object).map(([key, value]) => [key, value.toString('hex')])) as {
    [key in keyof T]: string;
  };
};

/**
 * Maps a `string -> string` object to a `string -> Buffer` object, where the original value is a hexadecimal string.
 *
 * @param {{ [key in keyof T]: string }} object
 * @return {{ [key in keyof T]: Buffer }}
 * @template T
 */
export const dehexifyObject = <T extends object>(
  object: { [key in keyof T]: string }
): { [key in keyof T]: Buffer } => {
  return Object.fromEntries(Object.entries<string>(object).map(([key, value]) => [key, Buffer.from(value, 'hex')])) as {
    [key in keyof T]: Buffer;
  };
};
