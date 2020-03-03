import React, { FunctionComponent } from 'react';
import Modal, { ModalBody, ModalFooter } from '../Modal';
import Button from '../ui/Button';

interface Props {
  title: string;
  isVisible: boolean;
  onClose(): void;
}

const Alert: FunctionComponent<Props> = ({ title, isVisible, children, onClose }) => (
  <Modal title={title} isVisible={isVisible} onClose={onClose}>
    <ModalBody>{children}</ModalBody>
    <ModalFooter>
      <Button type="secondary" onClick={onClose}>
        Close
      </Button>
    </ModalFooter>
  </Modal>
);

export default Alert;
