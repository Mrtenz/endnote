import { getTimestamp } from './date';

const DAY_IN_MILLISECONDS = 86400000;

describe('getTimestamp', () => {
  it('returns a Unix timestamp for n days from now', () => {
    const spy = jest.spyOn(Date, 'now');
    spy.mockReturnValue(1577833200000); // 2020-01-01

    const now = Date.now();
    expect(getTimestamp(0)).toBe(now);
    expect(getTimestamp(1)).toBe(now + DAY_IN_MILLISECONDS);
    expect(getTimestamp(7)).toBe(now + DAY_IN_MILLISECONDS * 7);
  });
});
