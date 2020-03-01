import React, { FunctionComponent } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useSelector } from '../../../hooks';
import { APPLICATION_THEMES } from '../../../store/settings';

const ThemeProvider: FunctionComponent = ({ children }) => {
  const theme = useSelector(state => state.settings.theme);

  return <StyledThemeProvider theme={APPLICATION_THEMES[theme]}>{children}</StyledThemeProvider>;
};

export default ThemeProvider;
