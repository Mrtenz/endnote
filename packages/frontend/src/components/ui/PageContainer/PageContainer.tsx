import styled from 'styled-components';
import breakpoint from '../../../theme/breakpoints';
import Container from '../Container';

const PageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 4.4rem 3.6rem;

  ${breakpoint('md')`
    padding: 4.4rem 1.2rem;
  `};
`;

export default PageContainer;
