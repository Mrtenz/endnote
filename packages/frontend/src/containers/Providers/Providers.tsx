import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import ApolloClientProvider from './ApolloClientProvider';
import ConfigProvider from './ConfigProvider';
import SentryProvider from './SentryProvider';
import ThemeProvider from './ThemeProvider';
import AlertProvider from './AlertProvider';

const Providers: FunctionComponent = ({ children }) => (
  <ConfigProvider>
    <Provider store={store}>
      <ThemeProvider>
        <SentryProvider>
          <ApolloClientProvider>
            <AlertProvider>
              {children}
            </AlertProvider>
          </ApolloClientProvider>
        </SentryProvider>
      </ThemeProvider>
    </Provider>
  </ConfigProvider>
);

export default Providers;
