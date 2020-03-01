import { Router } from '@reach/router';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import AddNote from '../AddNote';
import Note from '../Note';

const WrappedRouter = styled(Router)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Routes: FunctionComponent = () => (
  <WrappedRouter>
    <AddNote path="/" default={true} />
    <Note path="/:id" />
  </WrappedRouter>
);

export default Routes;
