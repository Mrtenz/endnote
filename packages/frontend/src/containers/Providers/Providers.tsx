import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import ApolloClientProvider from './ApolloClientProvider';
import ConfigProvider from './ConfigProvider';
import SentryProvider from './SentryProvider';
import ThemeProvider from './ThemeProvider';

const Providers: FunctionComponent = ({ children }) => (
  <ConfigProvider>
    <Provider store={store}>
      <ThemeProvider>
        <SentryProvider>
          <ApolloClientProvider>{children}</ApolloClientProvider>
        </SentryProvider>
      </ThemeProvider>
    </Provider>
  </ConfigProvider>
);

export default Providers;
