import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Card from '../ui/Card';
import Heading from '../ui/Heading';
import Text from '../ui/Text';

interface Props {
  title: string;
  content: string;
  views: number;
}

const CardHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.4rem;

  ${Heading} {
    margin: 0;
  }
`;

const ViewsCounter = styled(Text)`
  font-size: 1.25rem;
  margin: 0 0 0 1rem;
`;

const NoteCard: FunctionComponent<Props> = ({ title, content, views }) => (
  <Card>
    <CardHeading>
      <Heading as="h3">{title}</Heading>
      <ViewsCounter muted={true}>{views} views</ViewsCounter>
    </CardHeading>
    <Text>{content}</Text>
  </Card>
);

export default NoteCard;
