import React, { FunctionComponent } from 'react';
import ButtonLink from '../ButtonLink';
import Card from '../ui/Card';
import Heading from '../ui/Heading';
import Text from '../ui/Text';

const NotFound: FunctionComponent = () => (
  <Card small={true}>
    <Heading as="h3">Note not found</Heading>
    <Text>The note you are looking for could not be found. It may have been deleted.</Text>
    <ButtonLink to="/" type="primary">
      New note
    </ButtonLink>
  </Card>
);

export default NotFound;
