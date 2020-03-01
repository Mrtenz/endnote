import React, { FunctionComponent } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Heading from '../ui/Heading';
import Text from '../ui/Text';

const FailedToLoad: FunctionComponent = () => {
  const handleClick = () => {
    location.reload();
  };

  return (
    <Card small={true}>
      <Heading as="h3">Failed to load note</Heading>
      <Text>An error occurred while trying to load this note. Please try again.</Text>
      <Button type="primary" onClick={handleClick}>
        Try again
      </Button>
    </Card>
  );
};

export default FailedToLoad;
