import React, { FunctionComponent } from 'react';
import { hot } from 'react-hot-loader/root';
import { createGlobalStyle } from 'styled-components';
import Footer from './components/Footer';
import Providers from './containers/Providers';
import Routes from './containers/Routes';

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: 'Lato', sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.45rem;
    background: ${({ theme }) => theme.background};
  }

  #root {
    display: flex;
    flex-direction: column;
  }
`;

const App: FunctionComponent = () => (
  <Providers>
    <GlobalStyles />
    <Routes />

    <Footer />
  </Providers>
);

export default hot(App);
