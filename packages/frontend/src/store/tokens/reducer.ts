import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { addToken, INITIAL_STATE, removeToken, Token } from './types';

export const reducer = createReducer(INITIAL_STATE, {
  [addToken.type]: (state, action: PayloadAction<Token>) => {
    return {
      ...state,
      [action.payload.id]: action.payload
    };
  },

  [removeToken.type]: (state, action: PayloadAction<Token>) => {
    const id = action.payload.id;
    const { [id]: token, ...rest } = state;

    return rest;
  }
});
