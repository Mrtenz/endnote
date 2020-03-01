import { transitions } from 'polished';
import styled from 'styled-components';
import { DEFAULT_TRANSITION } from '../../../theme/theme';
import Icon from '../../Icon';

const IconButton = styled(Icon)`
  cursor: pointer;
  ${transitions(['opacity'], DEFAULT_TRANSITION)};

  :hover {
    opacity: 0.8;
  }
`;

export default IconButton;
