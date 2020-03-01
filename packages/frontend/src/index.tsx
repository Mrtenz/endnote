import { init } from '@sentry/browser';
import 'isomorphic-unfetch';
import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-lato';
import 'typeface-source-code-pro';
import App from './App';

if (process.env.SENTRY_FRONTEND_ENDPOINT) {
  init({ dsn: process.env.SENTRY_FRONTEND_ENDPOINT });
}

ReactDOM.render(<App />, document.getElementById('root'));
