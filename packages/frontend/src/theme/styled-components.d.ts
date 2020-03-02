import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  interface DefaultTheme {
    background: string;
    headerBackground: string;
    footerBackground: string;
    cardBackground: string;
    fieldBackground: string;
    fieldTextBackground: string;

    text: string;
    invertedText: string;
    buttonText: string;
    buttonInvertedText: string;
    link: string;

    border: string;
    borderFocus: string;
    borderRadius: string;

    modal: {
      background: string;
      contentBackground: string;
      closeButton: string;
    };

    arrowDown: string;

    colors: {
      primary: string;
      secondary: string;
      dark: string;
      light: string;

      success: string;
      info: string;
      warning: string;
      error: string;

      grey: string;
      lightGrey: string;
      lighterGrey: string;

      cyan: string;
    };
  }
}
