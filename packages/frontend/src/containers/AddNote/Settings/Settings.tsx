import React, { FunctionComponent, useState } from 'react';
import Tooltip from '../../../components/Tooltip';
import IconButton from '../../../components/ui/IconButton';
import SettingsModal from '../SettingsModal';

const Settings: FunctionComponent = () => {
  const [isVisible, setVisible] = useState<boolean>(false);

  const handleClick = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Tooltip text="Settings">
        <IconButton icon="settings" color="lightGrey" onClick={handleClick} />
      </Tooltip>
      <SettingsModal isVisible={isVisible} onClose={handleClose} />
    </>
  );
};

export default Settings;
