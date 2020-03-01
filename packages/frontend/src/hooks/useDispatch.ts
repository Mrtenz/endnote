import { useDispatch as useReduxDispatch } from 'react-redux';
import { store } from '../store';

/**
 * Type-safe version of the `react-redux` useDispatch hook.
 */
export const useDispatch: () => typeof store.dispatch = useReduxDispatch;
