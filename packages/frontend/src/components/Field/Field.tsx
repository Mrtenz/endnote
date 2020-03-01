import { getByteLength } from '@endnote/common';
import { darken, lighten, transitions } from 'polished';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DEFAULT_TRANSITION } from '../../theme';
import Text from '../ui/Text';

const FieldContainer = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2.4rem;
`;

const InnerField = styled.div`
  display: flex;
  border: 0.1rem solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.fieldBackground};
  color: ${({ theme }) => theme.text};
  font-size: 1.4rem;
  ${transitions(['border-color', 'background-color'], DEFAULT_TRANSITION)};

  :focus-within {
    border-color: ${({ theme }) => theme.borderFocus};
    background-color: ${({ theme }) => lighten(0.025, theme.fieldBackground)};
  }
`;

const FieldDescription = styled(Text)`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
`;

const FieldLabel = styled(FieldDescription)`
  font-weight: bold;
`;

interface FieldCounterProps {
  overLimit: boolean;
}

const FieldCounter = styled.div<FieldCounterProps>`
  display: inline-block;
  padding: 0.6rem 0.8rem;
  margin: 1rem auto 0 auto;
  background: ${({ theme, overLimit }) => (overLimit ? theme.colors.error : theme.colors.success)};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1.15rem;
  color: ${({ theme }) => theme.buttonInvertedText};
  ${transitions(['background'], DEFAULT_TRANSITION)};
`;

export const FieldText = styled.span`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.fieldTextBackground};
  border-top-right-radius: ${({ theme }) => theme.borderRadius};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
  padding: 1.5rem;

  ${Text} {
    margin: 0;
    font-size: 1.3rem;
    color: ${({ theme }) => darken(0.25, theme.text)};
  }
`;

interface Props {
  label?: string;
  description?: string;
  value?: string;
  limit?: number;
}

const Field: FunctionComponent<Props> = ({ label, description, value, limit, children }) => {
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    if (value !== undefined) {
      setLength(getByteLength(value));
    }
  }, [value]);

  return (
    <FieldContainer>
      {label && <FieldLabel>{label}</FieldLabel>}
      {description && <FieldDescription>{description}</FieldDescription>}
      <InnerField>{children}</InnerField>
      {limit && (
        <FieldCounter overLimit={length > limit}>
          {length.toLocaleString('en-GB')} / {limit.toLocaleString('en-GB')}
        </FieldCounter>
      )}
    </FieldContainer>
  );
};

export default Field;
