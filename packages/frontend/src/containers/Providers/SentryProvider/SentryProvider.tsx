import { init } from '@sentry/browser';
import React, { FunctionComponent, useEffect } from 'react';
import { useConfig } from '../../../hooks';

const SentryProvider: FunctionComponent = ({ children }) => {
  const { SENTRY_FRONTEND_ENDPOINT } = useConfig();

  useEffect(() => {
    init({ dsn: SENTRY_FRONTEND_ENDPOINT });
  }, [SENTRY_FRONTEND_ENDPOINT]);

  return <>{children}</>;
};

export default SentryProvider;
