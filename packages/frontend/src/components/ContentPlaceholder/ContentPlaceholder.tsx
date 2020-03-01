import React, { FunctionComponent } from 'react';
import styled, { keyframes } from 'styled-components';

const ROW_LENGTHS = [4, 2, 6, 8];

const PlaceholderAnimation = keyframes`
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
`;

const PlaceholderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(4, 1rem);
  grid-row-gap: 1rem;
`;

interface PlaceholderRowProps {
  span: number;
  row: number;
}

const PlaceholderRow = styled.div<PlaceholderRowProps>`
  grid-column: ${({ span }) => `1 / ${span + 1}`};
  grid-row: ${({ row }) => row};
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 100% 100%;
  opacity: 0.5;
  animation: ${PlaceholderAnimation} 2s infinite ease-in-out;
`;

const ContentPlaceholder: FunctionComponent = () => (
  <PlaceholderGrid>
    {ROW_LENGTHS.map((length, index) => (
      <PlaceholderRow key={`row-${index}`} span={length} row={index + 1} />
    ))}
  </PlaceholderGrid>
);

export default ContentPlaceholder;
