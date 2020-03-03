import { configureStore as configureReduxStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { IS_DEVELOPMENT, LOCAL_REDUX_STORE } from '../constants';
import { localStorageMiddleware } from './middleware';
import { rootReducer } from './reducer';
import { SettingsState } from './settings';
import { TokensState } from './tokens';

export interface ApplicationState {
  settings: SettingsState;
  tokens: TokensState;
}

/**
 * TODO: Figure out why middleware is broken without `any`
 */
export const store = configureReduxStore<ApplicationState>({
  reducer: rootReducer,
  middleware: [
    localStorageMiddleware({
      path: LOCAL_REDUX_STORE,
      keys: ['settings', 'tokens']
    }),
    logger
  ] as any // tslint:disable-line
});

if (IS_DEVELOPMENT && module.hot) {
  module.hot.accept('./reducer', () => store.replaceReducer(rootReducer));
}
