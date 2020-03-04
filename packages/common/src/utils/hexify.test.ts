import { dehexifyObject, hexifyObject } from './hexify';

describe('hexifyObject', () => {
  it('serialises buffers in an object to a hexadecimal string object', () => {
    const object = {
      foo: Buffer.from([1, 2, 3]),
      bar: Buffer.from([10, 20, 30])
    };

    expect(hexifyObject(object)).toStrictEqual({
      foo: '010203',
      bar: '0a141e'
    });
  });
});

describe('dehexifyObject', () => {
  it('deserialises buffers from a hexadecimal string object', () => {
    const object = {
      foo: '010203',
      bar: '0a141e'
    };

    expect(dehexifyObject(object)).toStrictEqual({
      foo: Buffer.from([1, 2, 3]),
      bar: Buffer.from([10, 20, 30])
    });
  });
});
