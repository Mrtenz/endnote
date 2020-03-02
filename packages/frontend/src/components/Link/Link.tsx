import { Link as ReachLink } from '@reach/router';
import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

const LINK_STYLE = css`
  text-decoration: none;
`;

const InternalLink = styled(ReachLink)`
  ${LINK_STYLE};
`;

const ExternalLink = styled.a`
  ${LINK_STYLE};
`;

interface Props {
  to: string;
  external?: boolean;
  className?: string;
}

const Link: FunctionComponent<Props> = ({ className, to, external, children }) => {
  if (external) {
    return (
      <ExternalLink className={className} href={to} rel="noopener noreferrer">
        {children}
      </ExternalLink>
    );
  }

  return (
    <InternalLink className={className} to={to}>
      {children}
    </InternalLink>
  );
};

export default Link;
