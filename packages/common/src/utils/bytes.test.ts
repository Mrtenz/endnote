import { getByteLength } from './bytes';

describe('getByteLength', () => {
  it('returns the byte length for strings', () => {
    expect(getByteLength('foo')).toBe(3);
    expect(getByteLength('føø')).toBe(5);
  });
});
