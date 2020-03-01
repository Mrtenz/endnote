import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { setTheme, Theme } from '../../store/settings';
import Tooltip from '../Tooltip';
import IconButton from '../ui/IconButton';

const ThemeSelector: FunctionComponent = () => {
  const theme = useSelector(state => state.settings.theme);
  const dispatch = useDispatch();

  const handleSwitch = () => {
    dispatch(setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  return (
    <Tooltip text="Switch theme">
      <IconButton icon="theme" color="lightGrey" onClick={handleSwitch} />
    </Tooltip>
  );
};

export default ThemeSelector;
