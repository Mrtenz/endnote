import { configureStore as configureReduxStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { IS_DEVELOPMENT } from '../constants';
import { localStorageMiddleware } from './middleware';
import { rootReducer } from './reducer';
import { SettingsState } from './settings';

export interface ApplicationState {
  settings: SettingsState;
}

/**
 * TODO: Figure out why middleware is broken without `any`
 */
export const store = configureReduxStore<ApplicationState>({
  reducer: rootReducer,
  middleware: [
    localStorageMiddleware({
      path: 'state',
      keys: ['settings']
    }),
    logger
  ] as any // tslint:disable-line
});

if (IS_DEVELOPMENT && module.hot) {
  module.hot.accept('./reducer', () => store.replaceReducer(rootReducer));
}
