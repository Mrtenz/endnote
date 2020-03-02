import { darken, transparentize } from 'polished';
import { DefaultTheme } from 'styled-components';
import arrowDownDark from '../assets/icons/arrow-down-dark.svg';
import arrowDown from '../assets/icons/arrow-down.svg';

export const TRANSITION_DURATION = '0.3';
export const DEFAULT_TRANSITION = `${TRANSITION_DURATION}s ease-in-out`;

export const colors = {
  primary: '#3e4b5b',
  secondary: '#c3bdbd',
  dark: '#3e4b5b',
  light: '#f8f9fa',

  success: '#1bcfb4',
  info: '#198ae3',
  warning: '#fed713',
  error: '#fe7c96',

  grey: '#434a54',
  lightGrey: '#aab2bd',
  lighterGrey: '#e8eff4',

  cyan: '#57c7d4'
};

export const light: DefaultTheme = {
  background: '#f4f6f9',
  headerBackground: 'white',
  footerBackground: 'white',
  cardBackground: 'white',
  fieldBackground: 'white',
  fieldTextBackground: colors.lighterGrey,

  text: '#343a40',
  invertedText: 'white',
  buttonText: '#343a40',
  buttonInvertedText: 'white',
  link: darken(0.2, colors.cyan),

  border: '#ebedf2',
  borderFocus: '#80bdff',
  borderRadius: '0.3rem',

  modal: {
    background: transparentize(0.5, colors.dark),
    contentBackground: 'white',
    closeButton: '#6a6a6a'
  },

  arrowDown,

  colors
};

export const dark: DefaultTheme = {
  background: '#151519',
  headerBackground: '#222328',
  footerBackground: '#222328',
  cardBackground: '#222328',
  fieldBackground: '#151519',
  fieldTextBackground: colors.grey,

  text: 'white',
  invertedText: '#343a40',
  buttonText: '#343a40',
  buttonInvertedText: 'white',
  link: colors.cyan,

  border: '#09090b',
  borderFocus: '#80bdff',
  borderRadius: '0.3rem',

  modal: {
    background: transparentize(0.5, colors.dark),
    contentBackground: '#151519',
    closeButton: '#6a6a6a'
  },

  arrowDown: arrowDownDark,

  colors
};
