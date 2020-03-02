import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import breakpoint from '../../theme/breakpoints';
import Text from '../ui/Text';
import Donate from './Donate';
import Socials from './Socials';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 3.6rem;
  background: ${({ theme }) => theme.footerBackground};
  border-top: 0.1rem solid ${({ theme }) => theme.border};

  ${Text} {
    font-size: 1.3rem;
    margin: 0;
  }

  ${breakpoint('md')`
    flex-direction: column;
  `};
`;

const Footer: FunctionComponent = () => (
  <FooterContainer>
    <Socials />
    <Donate />
  </FooterContainer>
);

export default Footer;
