/**
 * Whether the app is running in development mode or not.
 */
export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

/**
 * The key used to store the Redux state in localStorage.
 */
export const LOCAL_REDUX_STORE = 'state';

/**
 * The default note title that will be used if the user doesn't set a title.
 */
export const DEFAULT_NOTE_TITLE = 'Untitled note';

/**
 * Donation address for Ethereum, used in the footer.
 */
export const ETHEREUM_DONATION_ADDRESS = '0x1cb8aA6F4b86C8535AAEfE103CA9EFB03D08e287';

/**
 * Donation address for Bitcoin, used in the footer.
 */
export const BITCOIN_DONATION_ADDRESS = '3PC8T5goNn38UKYhSuMka5rAuiy5jm3oKZ';
