import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useConfig } from '../../../hooks';

const ApolloClientProvider: FunctionComponent = ({ children }) => {
  const [client, setClient] = useState<ApolloClient<{}>>();
  const { API_ENDPOINT } = useConfig();

  useEffect(() => {
    setClient(
      new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
          uri: API_ENDPOINT
        })
      })
    );
  }, [API_ENDPOINT]);

  if (!client) {
    return null;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
