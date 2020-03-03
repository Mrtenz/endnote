import { lighten, transitions } from 'polished';
import styled, { css } from 'styled-components';
import { DEFAULT_TRANSITION } from '../../../theme';
import Text from '../Text';

type ButtonType = 'primary' | 'secondary' | 'success' | 'danger' | 'light' | 'dark';

export interface Props {
  disabled?: boolean;
  type?: ButtonType;
}

const Button = styled(Text).attrs({ as: 'button' })<Props>`
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ theme, type = 'secondary' }) => (type === 'light' ? theme.buttonText : theme.buttonInvertedText)};
  padding: 1.3rem 4rem;
  background: ${({ theme, type = 'secondary' }) =>
    `linear-gradient(to right, ${lighten(0.05, theme.colors[type])}, ${theme.colors[type]})`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  ${transitions(['opacity', 'box-shadow'], DEFAULT_TRANSITION)};

  :hover {
    opacity: 0.7;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 0.3rem ${({ theme, type = 'secondary' }) => lighten(0.15, theme.colors[type])};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.65 !important;
      cursor: not-allowed;
    `};
`;

export default Button;
