import styled from 'styled-components';
import Text from '../Text';

type HeadingType = 'h1' | 'h2' | 'h3';

const HEADING_SIZE: { [key in HeadingType]: string } = {
  h1: '2.5rem',
  h2: '2.1rem',
  h3: '1.7rem'
};

interface Props {
  as?: HeadingType;
}

const Heading = styled(Text)<Props>`
  font-weight: bold;
  font-size: ${({ as = 'h1' }) => HEADING_SIZE[as]};
  margin: 0 0 2.4rem 0;
`;

export default Heading;
