import React, { ChangeEvent, FunctionComponent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import Field from '../Field';
import Heading from '../ui/Heading';
import Input from '../ui/Input';

interface Props {
  value: string;
  defaultValue: string;

  onChange(value: string): void;
}

interface HideableFieldProps {
  hidden: boolean;
}

const HiddenLabel = styled.label`
  cursor: text;
`;

const HideableField = styled.div<HideableFieldProps>`
  display: ${({ hidden }) => (hidden ? 'none' : 'block')} !important;
`;

const HiddenInput: FunctionComponent<Props> = ({ value, defaultValue, onChange }) => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [isDefault, setDefault] = useState<boolean>(true);

  const handleEdit = () => {
    setEditing(true);
    setDefault(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };

  const handleBlur = () => {
    setEditing(false);

    if (value === '') {
      onChange(defaultValue);
      setDefault(true);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <HiddenLabel onClick={handleEdit}>
      {!isEditing && (
        <Heading as="h3" muted={isDefault}>
          {value}
        </Heading>
      )}
      <HideableField hidden={!isEditing}>
        <Field>
          <Input
            type="text"
            maxLength={50}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </Field>
      </HideableField>
    </HiddenLabel>
  );
};

export default HiddenInput;
