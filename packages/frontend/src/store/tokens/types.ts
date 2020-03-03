import { createAction } from '@reduxjs/toolkit';
import { LOCAL_REDUX_STORE } from '../../constants';
import { rehydrate } from '../middleware';

export interface Token {
  id: string;
  token: string;
  expiryDate: number;
}

export interface TokensState {
  [id: string]: Token;
}

export const INITIAL_STATE: TokensState = rehydrate(LOCAL_REDUX_STORE, 'tokens', {});

export const addToken = createAction<Token, 'ADD_TOKEN'>('ADD_TOKEN');
export const removeToken = createAction<Token, 'REMOVE_TOKEN'>('REMOVE_TOKEN');
