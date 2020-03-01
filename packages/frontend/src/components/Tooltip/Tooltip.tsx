import { motion } from 'framer-motion';
import { transitions } from 'polished';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { DEFAULT_TRANSITION } from '../../theme';
import Text from '../ui/Text';

interface Props {
  text: string;
}

const TooltipContainer = styled(motion.div)`
  pointer-events: none;
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  margin-left: calc(-100% - 0.6rem);
  background: ${({ theme }) => theme.colors.dark};
  padding: 0.65rem 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  opacity: 0;
  transform: translateY(-0.5rem);
  ${transitions(['transform', 'opacity'], DEFAULT_TRANSITION)};

  ${Text} {
    display: block;
    color: ${({ theme }) => theme.buttonInvertedText};
    font-size: 1.2rem;
    margin: 0;
  }
`;

export const Tooltippable = styled.div`
  position: relative;

  :hover > ${TooltipContainer} {
    visibility: initial;
    opacity: 1;
    transform: translateY(0rem);
  }
`;

const Tooltip: FunctionComponent<Props> = ({ text, children }) => (
  <Tooltippable>
    {children}
    <TooltipContainer>
      <Text>{text}</Text>
    </TooltipContainer>
  </Tooltippable>
);

export default Tooltip;
