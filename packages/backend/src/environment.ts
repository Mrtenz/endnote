/**
 * Whether the app is running in development mode or not.
 */
export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

interface GetVariable {
  (key: string, required?: true): string;
  (key: string, required?: false): string | undefined;
}

/**
 * Get an envrionment variable by key. If `required` is set, this throws an error if the variable is not set.
 *
 * @param {string} key
 * @param {boolean} required
 * @return {string}
 */
export const getVariable: GetVariable = (key: string, required = true) => {
  const value = process.env[key];

  if (required && !value) {
    throw new Error(`Environment variable '${key}' is not specified`);
  }

  return value!;
};
