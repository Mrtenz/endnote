import React, { FunctionComponent } from 'react';
import Icon, { SUPPORTED_ICONS } from '../Icon';
import Link from '../Link';

interface Props {
  to: string;
  external?: boolean;
  icon: keyof typeof SUPPORTED_ICONS;
}

const IconLink: FunctionComponent<Props> = ({ to, external, icon }) => (
  <Link to={to} external={external}>
    <Icon icon={icon} />
  </Link>
);

export default IconLink;
