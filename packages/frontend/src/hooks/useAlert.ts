import { useContext } from 'react';
import { AlertContext } from '../containers/Providers/AlertProvider';

export const useAlert = () => useContext(AlertContext)!;
