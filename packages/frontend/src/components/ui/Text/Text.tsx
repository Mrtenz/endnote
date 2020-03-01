import styled from 'styled-components';

export interface Props {
  muted?: boolean;
}

const Text = styled.p<Props>`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  line-height: 1.5;
  margin: 0 0 1.6rem 0;
  opacity: ${({ muted }) => (muted ? '0.6' : '1')};
`;

export default Text;
