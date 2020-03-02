import styled from 'styled-components';
import breakpoint from '../../../theme/breakpoints';

const Container = styled.div`
  width: 100%;
  padding: 1.6rem 3.6rem;
  box-sizing: border-box;

  ${breakpoint('md')`
    padding: 1.6rem 1.2rem;
  `};
`;

export default Container;
