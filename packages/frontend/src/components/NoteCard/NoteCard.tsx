import React, { FunctionComponent } from 'react';
import Card from '../ui/Card';
import Heading from '../ui/Heading';
import Text from '../ui/Text';

interface Props {
  title: string;
  content: string;
  views: number;
}

const NoteCard: FunctionComponent<Props> = ({ title, content, views }) => (
  <Card>
    <Heading as="h3">
      {title} ({views})
    </Heading>
    <Text>{content}</Text>
  </Card>
);

export default NoteCard;
