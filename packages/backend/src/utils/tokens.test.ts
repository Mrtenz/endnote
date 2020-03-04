import { decryptToken, encryptToken } from './tokens';

const PASETO_KEY = Buffer.from(new Array(32).fill(undefined).map((_, index) => index));
const PASETO_TOKEN = 'v2.local.qmKIPw4DzUeCiI4LpytSpECGZsDXdSppFk_WMCa0z_IzuGwPfNzM4PzWv6ZichZEha6UCs2IIAeS-ak8m__ggTU';
const PASETO_PAYLOAD = {
  foo: 'bar',
  baz: 'qux'
};

describe('encryptToken', () => {
  it('encrypts a payload to a PASETO', async () => {
    await expect(encryptToken(PASETO_PAYLOAD, PASETO_KEY)).resolves.toBe(PASETO_TOKEN);
  });
});

describe('decryptToken', () => {
  it('decrypts a payload from a PASETO', async () => {
    await expect(decryptToken(PASETO_TOKEN, PASETO_KEY)).resolves.toStrictEqual(PASETO_PAYLOAD);
  });
});
