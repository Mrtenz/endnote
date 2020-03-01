import { ApolloProvider } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { client } from '../../client';
import { store } from '../../store';
import ThemeProvider from './ThemeProvider';

const Providers: FunctionComponent = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ThemeProvider>
  </Provider>
);

export default Providers;
