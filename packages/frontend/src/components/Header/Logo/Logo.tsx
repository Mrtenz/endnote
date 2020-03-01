import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Link from '../../Link';
import Heading from '../../ui/Heading';

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${Heading} {
    margin: 0;
  }
`;

const Logo: FunctionComponent = () => (
  <LogoContainer>
    <Link to="/">
      <Heading>Endnote</Heading>
    </Link>
  </LogoContainer>
);

export default Logo;
