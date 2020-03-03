import React, { FunctionComponent } from 'react';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import Button from '../../../components/ui/Button';
import Text from '../../../components/ui/Text';

interface Props {
  isVisible: boolean;
  onConfirm(): void;
  onClose(): void;
}

const DeleteModal: FunctionComponent<Props> = ({ isVisible, onConfirm, onClose }) => (
  <Modal title="Delete this note" isVisible={isVisible} onClose={onClose}>
    <ModalBody>
      <Text>Are you sure you want to delete this note?</Text>
    </ModalBody>
    <ModalFooter>
      <Button type="danger" onClick={onConfirm}>
        Delete
      </Button>
      <Button type="secondary" onClick={onClose}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
);

export default DeleteModal;
