import { Link as ReachLink } from '@reach/router';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledLink = styled(ReachLink)`
  text-decoration: none;
`;

interface Props {
  to: string;
  className?: string;
}

const Link: FunctionComponent<Props> = ({ className, to, children }) => (
  <StyledLink className={className} to={to}>
    {children}
  </StyledLink>
);

export default Link;
