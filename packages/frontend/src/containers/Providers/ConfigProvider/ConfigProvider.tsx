import React, { createContext, FunctionComponent, useEffect, useState } from 'react';

export interface Config {
  APPLICATION_URL: string;
  API_ENDPOINT: string;
  RECAPTCHA_SITE_KEY: string;
  SENTRY_FRONTEND_ENDPOINT: string;
}

export const ConfigContext = createContext<Config | undefined>(undefined);

const ConfigProvider: FunctionComponent = ({ children }) => {
  const [config, setConfig] = useState<Config>();

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(setConfig);
  }, []);

  if (!config) {
    return null;
  }

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
