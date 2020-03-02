import { Link as ReachLink } from '@reach/router';
import { lighten, transitions } from 'polished';
import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { DEFAULT_TRANSITION } from '../../theme';

const LINK_STYLE = css`
  text-decoration: none;
  color: ${({ theme }) => theme.link};
  ${transitions(['color'], DEFAULT_TRANSITION)};

  :hover {
    color: ${({ theme }) => lighten(0.1, theme.link)};
  }
`;

const InternalLink = styled(ReachLink)`
  ${LINK_STYLE};
`;

const ExternalLink = styled.a`
  ${LINK_STYLE};
`;

export interface Props {
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
