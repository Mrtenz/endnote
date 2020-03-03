import { combineReducers } from 'redux';
import { reducer as settings } from './settings';
import { ApplicationState } from './store';
import { reducer as tokens } from './tokens';

export const rootReducer = combineReducers<ApplicationState>({
  settings,
  tokens
});
