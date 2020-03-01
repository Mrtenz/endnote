import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { API_ENDPOINT } from './constants';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: API_ENDPOINT
  })
});
