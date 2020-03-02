import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import IconLink from '../../IconLink';
import Tooltip, { Tooltippable } from '../../Tooltip';

const SocialsContainer = styled.section`
  display: flex;

  ${Tooltippable} {
    margin-right: 2rem;
  }
`;

const Socials: FunctionComponent = () => (
  <SocialsContainer>
    <Tooltip text="GitHub">
      <IconLink to="https://github.com/Mrtenz/endnote" icon="github" external={true} />
    </Tooltip>

    <Tooltip text="Email">
      <IconLink to="mailto:maarten@zuidhoorn.com" icon="email" external={true} />
    </Tooltip>
  </SocialsContainer>
);

export default Socials;
