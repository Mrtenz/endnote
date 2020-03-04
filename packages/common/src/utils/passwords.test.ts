import { generatePassword, getPasswordFromHash } from './passwords';

describe('generatePassword', () => {
  it('generates a random password as hexadecimal string', () => {
    expect(generatePassword()).toMatch(/[0-9a-f]{8}/);
    expect(generatePassword(16)).toMatch(/[0-9a-f]{16}/);
  });
});

describe('getPasswordFromHash', () => {
  it('returns a password and salt from a URL hash', () => {
    const hash = '1c958b4ff055d15ab0c9e7235c10ab3b';

    expect(getPasswordFromHash(hash)).toStrictEqual({
      password: '1c958b4ff055d15a',
      salt: 'b0c9e7235c10ab3b'
    });
    expect(getPasswordFromHash(`#${hash}`)).toStrictEqual({
      password: '1c958b4ff055d15a',
      salt: 'b0c9e7235c10ab3b'
    });
  });

  it('throws if the hash is not 32 chracters long', () => {
    expect(() => getPasswordFromHash('foo')).toThrow();
  });
});
