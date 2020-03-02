import React, { FunctionComponent } from 'react';
import Link, { Props as LinkProps } from '../Link';
import Button, { Props as ButtonProps } from '../ui/Button';

type Props = LinkProps & ButtonProps;

const ButtonLink: FunctionComponent<Props> = ({ className, to, external, children, ...rest }) => (
  <Link className={className} to={to} external={external}>
    <Button {...rest}>{children}</Button>
  </Link>
);

export default ButtonLink;
