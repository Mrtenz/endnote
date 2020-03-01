import React, { FunctionComponent, useRef } from 'react';
import Field from '../../../components/Field';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { APPLICATION_URL } from '../../../constants';

interface Props {
  isVisible: boolean;
  id: string;
  password: string;

  onClose(): void;
}

const ShareModal: FunctionComponent<Props> = ({ isVisible, id, password, onClose }) => {
  const withPassword = useRef<HTMLInputElement>(null);
  const withoutPassword = useRef<HTMLInputElement>(null);
  const onlyPassword = useRef<HTMLInputElement>(null);

  const handleCopyWithPassword = () => {
    withPassword.current?.select();
    document.execCommand('copy');
  };

  const handleCopyWithoutPassword = () => {
    withoutPassword.current?.select();
    document.execCommand('copy');
  };

  const handleCopyPassword = () => {
    onlyPassword.current?.select();
    document.execCommand('copy');
  };

  return (
    <Modal title="Share this note" large={true} isVisible={isVisible} onClose={onClose}>
      <ModalBody>
        <Field label="URL" description="Use this URL to share the note with the password.">
          <Input ref={withPassword} type="text" value={`${APPLICATION_URL}/${id}#${password}`} readOnly={true} />
          <Button type="dark" onClick={handleCopyWithPassword}>
            Copy
          </Button>
        </Field>
        <Field label="URL (without password)" description="Use this URL to share the note without the password.">
          <Input ref={withoutPassword} type="text" value={`${APPLICATION_URL}/${id}`} readOnly={true} />
          <Button type="dark" onClick={handleCopyWithoutPassword}>
            Copy
          </Button>
        </Field>
        <Field label="Password" description="The password that was used to encrypt the note.">
          <Input ref={onlyPassword} type="text" value={password} readOnly={true} />
          <Button type="dark" onClick={handleCopyPassword}>
            Copy
          </Button>
        </Field>
      </ModalBody>
      <ModalFooter>
        <Button type="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ShareModal;
