import React, { ChangeEvent, FunctionComponent } from 'react';
import Field, { FieldText } from '../../../components/Field';
import Modal, { ModalBody, ModalFooter } from '../../../components/Modal';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Text from '../../../components/ui/Text';
import { useDispatch, useSelector } from '../../../hooks';
import { setDeleteAfter, setMaxViews } from '../../../store/settings';

interface Props {
  isVisible: boolean;

  onClose(): void;
}

const SettingsModal: FunctionComponent<Props> = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const { deleteAfter, maxViews } = useSelector(state => state.settings);

  const handleChangeDeleteAfter = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value);
    dispatch(setDeleteAfter(value));
  };

  const handleChangeViews = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value);
    dispatch(setMaxViews(value));
  };

  return (
    <Modal title="Settings" large={true} isVisible={isVisible} onClose={onClose}>
      <ModalBody>
        <Field label="Delete after" description="The number of days after which your note will be deleted.">
          <Input as="select" value={String(deleteAfter)} onChange={handleChangeDeleteAfter}>
            <option value="1">1 day</option>
            <option value="7">7 days</option>
            <option value="30">30 days</option>
          </Input>
        </Field>

        <Field
          label="Maximum views"
          description="Optionally you can set a maximum number of views, after which the note will be deleted. Set to 0 to disable.">
          <Input type="number" placeholder="0" min="0" max="2147483647" value={maxViews} onChange={handleChangeViews} />
          <FieldText>
            <Text>Views</Text>
          </FieldText>
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

export default SettingsModal;
