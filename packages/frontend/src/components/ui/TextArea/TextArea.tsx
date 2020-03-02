import styled from 'styled-components';
import Input from '../Input';

const TextArea = styled(Input)`
  color: ${({ theme }) => theme.text};
  resize: none;
  font-family: 'Source Code Pro', monospace;
  width: 100%;
  padding: 1.5rem 2.2rem;
  border: none;
  background: none;
  flex: 1;

  :focus {
    outline: none;
  }
`;

export default TextArea;
