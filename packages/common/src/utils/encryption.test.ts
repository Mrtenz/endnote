import { getByteLength } from './bytes';
import { decrypt, decryptAndVerify, encrypt, generateKey, verifyHmac } from './encryption';

const PASSWORD = '42e80e3fb268342b';
const SALT = 'fae8155faf96f9ee';

const CONTENT = 'The quick brown fox jumps over the lazy dog';

const INITIALISATION_VECTOR = Buffer.from('d588271eb26d22e543d8659003c198cb', 'hex');
const CIPHER_TEXT = Buffer.from(
  '66d8cd8fea5513cfa4be31c4e0a52a880f7a7512b66132a19ddf555653215a82799a6c25e778f18cde436e5c868c0239',
  'hex'
);
const HMAC = Buffer.from(
  'b5b108bbec64d853eb647ea63297bcad7d3fae8b7286f622f4aca97a5442418cf97d8ef55e60803d6bb44e939164e5edc75907c9013e7c784aebf98d1df09005',
  'hex'
);

describe('generateKey', () => {
  it('deterministically generates a cryptographic key for a password and salt', async () => {
    await expect(generateKey(PASSWORD, SALT)).resolves.toMatchSnapshot();
  });

  it('generates 512-bit keys', async () => {
    await expect(generateKey(PASSWORD, SALT)).resolves.toHaveLength(512 / 8);
  });
});

describe('encrypt', () => {
  it('encrypts a string and generates a HMAC', async () => {
    const key = await generateKey(PASSWORD, SALT);
    await expect(encrypt(CONTENT, key, INITIALISATION_VECTOR)).resolves.toMatchSnapshot();
  });

  it('returns ciphertext with a predictable length', async () => {
    // tslint:disable-next-line
    const expectedLength = (getByteLength(CONTENT) | 15) + 1;

    const key = await generateKey(PASSWORD, SALT);
    const { cipher } = await encrypt(CONTENT, key, INITIALISATION_VECTOR);
    expect(cipher).toHaveLength(expectedLength);
  });
});

describe('decrypt', () => {
  it('decrypts a string', async () => {
    const key = await generateKey(PASSWORD, SALT);
    await expect(decrypt(CIPHER_TEXT, key, INITIALISATION_VECTOR)).resolves.toBe(CONTENT);
  });

  it('throws if the content could not be decrypted', async () => {
    const key = await generateKey(PASSWORD, SALT);
    await expect(decrypt(Buffer.from('foo bar', 'utf8'), key, INITIALISATION_VECTOR)).rejects.toThrow();
  });
});

describe('verifyHmac', () => {
  it('checks the HMAC for the ciphertext', async () => {
    const key = await generateKey(PASSWORD, SALT);
    await expect(verifyHmac(CIPHER_TEXT, key, INITIALISATION_VECTOR, HMAC)).resolves.toBe(true);
  });

  it('returns false if the HMAC is invalid', async () => {
    const key = await generateKey(PASSWORD, SALT);
    await expect(verifyHmac(Buffer.from('foo bar', 'utf8'), key, INITIALISATION_VECTOR, HMAC)).resolves.toBe(false);
    await expect(verifyHmac(CIPHER_TEXT, key, Buffer.from('foo bar', 'utf8'), HMAC)).resolves.toBe(false);
    await expect(verifyHmac(CIPHER_TEXT, key, INITIALISATION_VECTOR, Buffer.from('foo bar', 'utf8'))).resolves.toBe(
      false
    );
  });
});

describe('decryptAndVerify', () => {
  it('decrypts the ciphertext and checks the HMAC', async () => {
    await expect(decryptAndVerify(`${PASSWORD}${SALT}`, CIPHER_TEXT, INITIALISATION_VECTOR, HMAC)).resolves.toBe(
      CONTENT
    );
  });

  it('throws if the content could not be decrypted', async () => {
    await expect(
      decryptAndVerify(`${PASSWORD}${SALT}`, CIPHER_TEXT, INITIALISATION_VECTOR, Buffer.from('foo bar', 'utf8'))
    ).rejects.toThrow();
  });
});
