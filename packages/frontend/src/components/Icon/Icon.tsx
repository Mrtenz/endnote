import React, { DetailedHTMLProps, FunctionComponent, ImgHTMLAttributes } from 'react';
import styled from 'styled-components';
import { colors } from '../../theme';

import arrowDown from '../../assets/icons/arrow-down.svg';
import settings from '../../assets/icons/cogs.svg';
import share from '../../assets/icons/share.svg';
import theme from '../../assets/icons/theme.svg';

export const SUPPORTED_ICONS = {
  arrowDown,
  settings,
  share,
  theme
};

interface OwnProps {
  icon: keyof typeof SUPPORTED_ICONS;
  color?: keyof typeof colors;
  size?: string;
}

export type Props = OwnProps & DetailedHTMLProps<ImgHTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const StyledIcon = styled.span<OwnProps>`
  display: inline-block;
  width: ${({ size = '2rem' }) => size};
  height: ${({ size = '2rem' }) => size};
  mask: ${({ icon }) => `url(${SUPPORTED_ICONS[icon]})`} no-repeat center;
  background: ${({ color = 'primary' }) => colors[color]} !important;
`;

const Icon: FunctionComponent<Props> = ({ className, icon, size, color, ref, ...rest }) => (
  <StyledIcon className={className} icon={icon} size={size} color={color} {...rest} />
);

export default Icon;
