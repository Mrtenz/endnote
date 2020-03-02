import { useContext } from 'react';
import { Config, ConfigContext } from '../containers/Providers/ConfigProvider';

export const useConfig = (): Config => {
  return useContext(ConfigContext)!;
};
