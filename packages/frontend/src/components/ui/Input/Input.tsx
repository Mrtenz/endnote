import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { lighten } from 'polished';

const StyledInput = styled.input`
  width: 100%;
  border: none;
  padding: 1.5rem 2.2rem;
  appearance: none;
  box-sizing: border-box;
  background: none;
  color: ${({ theme }) => theme.text};

  :focus {
    outline: none;
  }

  option {
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => lighten(0.025, theme.fieldBackground)};
  }

  ${({ as }: { as: string }) =>
    as === 'select' &&
    css`
      background: url(${({ theme }) => theme.arrowDown}) no-repeat right;
      background-position-x: calc(100% - 1.4rem);
    `};
`;

export interface OwnProps {
  as?: 'input' | 'select' | 'textarea';
}

type Props = OwnProps & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'>;

const Input = forwardRef<HTMLInputElement, Props>(({ as = 'input', ...rest }, ref) => (
  <StyledInput {...rest} ref={ref} as={as} />
));

export default Input;
