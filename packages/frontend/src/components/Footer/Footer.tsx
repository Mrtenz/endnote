import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BITCOIN_DONATION_ADDRESS, ETHEREUM_DONATION_ADDRESS } from '../../constants';
import Text from '../ui/Text';
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
`;

const Footer: FunctionComponent = () => (
  <FooterContainer>
    <Socials />
    <section>
      <Text muted={true}>Donations</Text>
      <Text muted={true}>Ethereum (ETH): {ETHEREUM_DONATION_ADDRESS}</Text>
      <Text muted={true}>Bitcoin (BTC) {BITCOIN_DONATION_ADDRESS}</Text>
    </section>
  </FooterContainer>
);

export default Footer;
