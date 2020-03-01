/**
 * Whether the app is running in development mode or not.
 */
export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

/**
 * The full URL of the application.
 */
export const APPLICATION_URL = process.env.APPLICATION_URL;

/**
 * The API endpoint to use for GraphQL.
 */
export const API_ENDPOINT = process.env.API_ENDPOINT;

/**
 * The Google ReCAPTCHA site key.
 */
export const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;

/**
 * The key used to store the Redux state in localStorage.
 */
export const LOCAL_REDUX_STORE = 'state';

/**
 * The default note title that will be used if the user doesn't set a title.
 */
export const DEFAULT_NOTE_TITLE = 'Untitled note';
