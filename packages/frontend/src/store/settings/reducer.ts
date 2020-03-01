import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_STATE, setDeleteAfter, setMaxViews, setTheme, Theme } from './types';

export const reducer = createReducer(INITIAL_STATE, {
  [setDeleteAfter.type]: (state, action: PayloadAction<number>) => {
    return {
      ...state,
      deleteAfter: action.payload
    };
  },

  [setMaxViews.type]: (state, action: PayloadAction<number>) => {
    return {
      ...state,
      maxViews: action.payload
    };
  },

  [setTheme.type]: (state, action: PayloadAction<Theme>) => {
    return {
      ...state,
      theme: action.payload
    };
  }
});
