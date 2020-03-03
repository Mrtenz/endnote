import { combineReducers } from 'redux';
import { reducer as settings } from './settings';
import { reducer as tokens } from './tokens';
import { ApplicationState } from './store';

export const rootReducer = combineReducers<ApplicationState>({
  settings,
  tokens
});
