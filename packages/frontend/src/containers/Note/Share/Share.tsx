import React, { FunctionComponent, useState } from 'react';
import Tooltip from '../../../components/Tooltip';
import IconButton from '../../../components/ui/IconButton';
import ShareModal from '../ShareModal/ShareModal';

interface Props {
  id: string;
  password: string;
}

const Share: FunctionComponent<Props> = ({ id, password }) => {
  const [isVisible, setVisible] = useState<boolean>(false);

  const handleClick = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <ShareModal isVisible={isVisible} id={id} password={password} onClose={handleClose} />
      <Tooltip text="Share this note">
        <IconButton icon="share" color="lightGrey" onClick={handleClick} />
      </Tooltip>
    </>
  );
};

export default Share;
