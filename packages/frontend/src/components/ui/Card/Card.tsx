import styled, { css } from 'styled-components';
import Heading from '../Heading';

interface Props {
  grow?: boolean;
  small?: boolean;
}

const Card = styled.section<Props>`
  background: ${({ theme }) => theme.cardBackground};
  padding: 4rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  width: ${({ small }) => (small ? '50rem' : '100%')};
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 auto;

  ${({ grow }) =>
    grow &&
    css`
      flex: 1;
    `};

  & > ${Heading} {
    font-size: 1.8rem;
  }
`;

export default Card;
