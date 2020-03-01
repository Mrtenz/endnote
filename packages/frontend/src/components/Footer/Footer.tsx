import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Text from '../ui/Text';

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
`;

const Footer: FunctionComponent = () => (
  <FooterContainer>
    <Text muted={true}>Made by Maarten Zuidhoorn</Text>
    <section>
      <Text muted={true}>Donations:</Text>
      <Text muted={true}>Ethereum (ETH)</Text>
      <Text muted={true}>Bitcoin (BTC)</Text>
    </section>
  </FooterContainer>
);

export default Footer;
