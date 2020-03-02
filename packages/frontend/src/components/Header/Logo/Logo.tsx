import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import breakpoint from '../../../theme/breakpoints';
import Link from '../../Link';
import Heading from '../../ui/Heading';
import Text from '../../ui/Text';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  ${Heading} {
    margin: 0;
  }

  ${breakpoint('md')`
    align-items: flex-start;
    flex-direction: column;
  `};
`;

const LogoText = styled(Text)`
  margin: 0 0 0 1.5rem;
  font-size: 1.25rem;

  ${breakpoint('md')`
    margin: 0;
  `};
`;

const Logo: FunctionComponent = () => (
  <LogoContainer>
    <Link to="/">
      <Heading>Endnote</Heading>
    </Link>
    <LogoText muted={true}>End-to-end encrypted note sharing app</LogoText>
  </LogoContainer>
);

export default Logo;
