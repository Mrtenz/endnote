import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { BITCOIN_DONATION_ADDRESS, ETHEREUM_DONATION_ADDRESS } from '../../../constants';
import breakpoint from '../../../theme/breakpoints';
import Link from '../../Link';
import Heading from '../../ui/Heading';
import Text from '../../ui/Text';

const DonateContainer = styled.section`
  ${breakpoint('md')`
    margin-top: 2rem;
  `};

  ${Text} {
    word-break: break-all;
  }
`;

const Donate: FunctionComponent = () => (
  <DonateContainer>
    <Heading as="h3">Donations</Heading>
    <Text muted={true}>
      Ethereum:{' '}
      <Link to={`https://etherscan.io/address/${ETHEREUM_DONATION_ADDRESS}`} external={true}>
        {ETHEREUM_DONATION_ADDRESS}
      </Link>
    </Text>
    <Text muted={true}>
      Bitcoin:{' '}
      <Link to={`https://www.blockchain.com/btc/address/${BITCOIN_DONATION_ADDRESS}`} external={true}>
        {BITCOIN_DONATION_ADDRESS}
      </Link>
    </Text>
  </DonateContainer>
);

export default Donate;
