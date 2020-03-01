import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import ThemeSelector from '../ThemeSelector';
import { Tooltippable } from '../Tooltip';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Logo from './Logo';

const HeaderContainer = styled(Container).attrs({ as: 'header' })`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background: ${({ theme }) => theme.headerBackground};
  border-bottom: 0.1rem solid ${({ theme }) => theme.border};
`;

const HeaderMenu = styled.div`
  display: flex;
  align-items: center;

  ${Button}, ${Tooltippable} {
    margin: 0 0 0 3.2rem;
  }
`;

const Header: FunctionComponent = ({ children }) => (
  <HeaderContainer>
    <Logo />
    <HeaderMenu>
      <ThemeSelector />
      {children}
    </HeaderMenu>
  </HeaderContainer>
);

export default Header;
