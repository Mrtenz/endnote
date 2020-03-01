import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import { darken, transitions } from 'polished';
import React, { FunctionComponent, MouseEvent } from 'react';
import styled from 'styled-components';
import { DEFAULT_TRANSITION, TRANSITION_DURATION } from '../../theme';
import Button from '../ui/Button';
import Heading from '../ui/Heading';

const ModalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.modal.background};
  z-index: 1000;
`;

interface ModalContainerProps {
  large?: boolean;
}

const ModalContainer = styled(motion.section)<ModalContainerProps>`
  width: 100%;
  max-width: ${({ large }) => (large ? '90rem' : '50rem')};
  margin: 0 1rem;
  background: ${({ theme }) => theme.modal.contentBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 2.6rem;

  ${Heading} {
    margin: 0;
    font-size: 1.6rem;
  }
`;

const CloseButton = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  color: ${({ theme }) => theme.modal.closeButton};
  ${transitions(['color'], DEFAULT_TRANSITION)};
  font-size: 2rem;

  :hover {
    color: ${({ theme }) => darken(0.2, theme.modal.closeButton)};
  }
`;

export const ModalBody = styled.div`
  padding: 3.5rem 2.6rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem 3.1rem;

  ${Button} {
    margin: 0.4rem;
  }
`;

const MODAL_BACKGROUND_ANIMATION: MotionProps = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  },
  transition: {
    duration: TRANSITION_DURATION
  }
};

const MODAL_ANIMATION: MotionProps = {
  initial: {
    y: -20
  },
  animate: {
    y: 0
  },
  exit: {
    y: 20
  },
  transition: {
    duration: TRANSITION_DURATION
  }
};

interface Props {
  title: string;
  isVisible: boolean;
  large?: boolean;

  onClose(): void;
}

const Modal: FunctionComponent<Props> = ({ title, isVisible, large = false, children, onClose }) => {
  const handleClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ModalWrapper {...MODAL_BACKGROUND_ANIMATION} onClick={handleClick}>
          <ModalContainer {...MODAL_ANIMATION} large={large}>
            <ModalHeader>
              <Heading as="h2">{title}</Heading>
              <CloseButton onClick={onClose}>×</CloseButton>
            </ModalHeader>
            {children}
          </ModalContainer>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default Modal;
