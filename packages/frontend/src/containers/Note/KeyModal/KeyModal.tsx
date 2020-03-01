import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import Field from '../../../components/Field';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

interface Props {
  isVisible: boolean;

  onContinue(key: string): void;
  onClose(): void;
}

const KeyModal: FunctionComponent<Props> = ({ isVisible, onContinue, onClose }) => {
  const [key, setKey] = useState<string>('');
  const [isValid, setValid] = useState<boolean>(false);

  useEffect(() => {
    setValid(false);
    if (key.length === 32 && key.match(/[0-9a-f]+/)) {
      setValid(true);
    }
  }, [key]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKey(event.currentTarget.value);
  };

  const handleContinue = () => {
    onContinue(key);
  };

  return (
    <Modal title="Enter a password" isVisible={isVisible} onClose={onClose}>
      <ModalBody>
        <Field label="Password" description="This note is encrypted with a password. Please enter it here to continue.">
          <Input type="text" value={key} onChange={handleChange} />
        </Field>
      </ModalBody>
      <ModalFooter>
        <Button type="dark" onClick={handleContinue} disabled={!isValid}>
          Continue
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default KeyModal;
