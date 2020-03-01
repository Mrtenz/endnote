import { Middleware } from 'redux';
import { ApplicationState } from '../store';

interface LocalStorageMiddlewareOptions {
  /**
   * The path in localStorage to store the state.
   */
  path: string;

  /**
   * The keys in the state to persist to localStorage.
   */
  keys: string[];
}

/**
 * Middleware to store a subset of the state in localStorage.
 *
 * @param {LocalStorageMiddlewareOptions} options
 * @return {Middleware}
 */
export const localStorageMiddleware = ({ path, keys }: LocalStorageMiddlewareOptions): Middleware => ({
  getState
}) => next => action => {
  const value = next(action);
  const toPersist: Partial<ApplicationState> = Object.fromEntries(
    Object.entries(getState()).filter(entry => keys.includes(entry[0]))
  );

  localStorage.setItem(path, JSON.stringify(toPersist));

  return value;
};

/**
 * Rehydrate a reducer from localStorage.
 *
 * @param {string} path
 * @param {string} key
 * @param {T} initialState
 * @return {T}
 * @template T
 */
export const rehydrate = <T extends object>(path: string, key: string, initialState: T): T => {
  const json = localStorage.getItem(path);
  if (json) {
    const state = JSON.parse(json);

    return {
      ...initialState,
      ...state[key]
    };
  }

  return initialState;
};
