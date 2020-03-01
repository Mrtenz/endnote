import { DAY_IN_MILLISECONDS } from '../constants';

/**
 * Get the timestamp for n number of days from the current date. Returns the timestamp as milliseconds since Unix epoch.
 *
 * @param {number} days
 * @return {number}
 */
export const getTimestamp = (days: number) => {
  return Date.now() + days * DAY_IN_MILLISECONDS;
};
