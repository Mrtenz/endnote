import React, { FunctionComponent, useState } from 'react';
import Tooltip from '../../../components/Tooltip';
import IconButton from '../../../components/ui/IconButton';
import DeleteModal from '../DeleteModal';

interface Props {
  onConfirm (): void;
}

const Delete: FunctionComponent<Props> = ({ onConfirm }) => {
  const [isVisible, setVisible] = useState<boolean>(false);

  const handleClick = () => {
    setVisible(true);
  };

  const handleConfirm = () => {
    setVisible(false);
    onConfirm();
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Tooltip text="Delete this note">
        <IconButton icon="trashCan" color="lightGrey" onClick={handleClick} />
      </Tooltip>
      <DeleteModal isVisible={isVisible} onConfirm={handleConfirm} onClose={handleClose}/>
    </>
  );
};

export default Delete;
