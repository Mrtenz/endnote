import { createAction } from '@reduxjs/toolkit';
import { LOCAL_REDUX_STORE } from '../../constants';
import { dark, light } from '../../theme';
import { rehydrate } from '../middleware';

/**
 * Get the preferred theme based on the user's browser settings. Only used if the theme isn't stored in localStorage
 * already.
 *
 * @return {Theme}
 */
const getPreferredTheme = (): Theme => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return Theme.DARK;
  }

  return Theme.LIGHT;
};

export enum Theme {
  DARK = 'DARK',
  LIGHT = 'LIGHT'
}

export const APPLICATION_THEMES = {
  [Theme.DARK]: dark,
  [Theme.LIGHT]: light
};

export interface SettingsState {
  deleteAfter: number;
  maxViews: number;
  theme: Theme;
}

export const INITIAL_STATE: SettingsState = rehydrate(LOCAL_REDUX_STORE, 'settings', {
  deleteAfter: 7,
  maxViews: 0,
  theme: getPreferredTheme()
});

export const setDeleteAfter = createAction<SettingsState['deleteAfter'], 'SET_DELETE_AFTER'>('SET_DELETE_AFTER');
export const setMaxViews = createAction<SettingsState['maxViews'], 'SET_MAX_VIEWS'>('SET_MAX_VIEWS');
export const setTheme = createAction<SettingsState['theme'], 'SET_THEME'>('SET_THEME');
