import { useQuery } from '@apollo/client';
import { decryptAndVerify, dehexifyObject, NoteModel } from '@endnote/common';
import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import ButtonLink from '../../components/ButtonLink';
import ContentPlaceholder from '../../components/ContentPlaceholder';
import FailedToLoad from '../../components/FailedToLoad';
import Header from '../../components/Header';
import NoteCard from '../../components/NoteCard';
import NotFound from '../../components/NotFound';
import Card from '../../components/ui/Card';
import Heading from '../../components/ui/Heading';
import PageContainer from '../../components/ui/PageContainer';
import KeyModal from './KeyModal/KeyModal';
import noteQuery from './Note.query.gql';
import Share from './Share';
import DeleteNote from '../DeleteNote';
import { useAlert } from '../../hooks';
import Text from '../../components/ui/Text';

interface NoteQueryData {
  note: Pick<NoteModel, 'title' | 'cipher' | 'iv' | 'hmac' | 'views'>;
}

interface Params {
  id: string;
}

type Props = RouteComponentProps<Params>;

const Note: FunctionComponent<Props> = ({ id, location }) => {
  const alert = useAlert();
  const [key, setKey] = useState<string>('');
  const [isVisible, setVisible] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const { loading, error, data } = useQuery<NoteQueryData>(noteQuery, {
    variables: {
      id
    }
  });

  useEffect(() => {
    if (data?.note) {
      if (location?.hash) {
        return setKey(location?.hash.substring(1));
      }

      setVisible(true);
    }
  }, [data?.note, location?.hash]);

  useEffect(() => {
    if (key && data) {
      const {
        note: { title, views, ...rest }
      } = data;
      const { cipher, iv, hmac } = dehexifyObject(rest);

      decryptAndVerify(key, cipher, iv, hmac)
        .then(setContent)
        .catch(() => {
          alert('Failed to decrypt the note', (
            <Text>
              The note could not be decrypted. Please make sure the password is correct.
            </Text>
          ))
        });
    }
  }, [key, data]);

  const handleContinue = (newKey: string) => {
    setKey(newKey);
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  let component;
  if (loading || !content) {
    component = (
      <Card>
        <ContentPlaceholder/>
      </Card>
    );
  }

  if (!loading && !data?.note) {
    component = <NotFound/>;
  }

  if (error) {
    component = <FailedToLoad/>;
  }

  if (data && content) {
    component = <NoteCard title={data.note.title} content={content} views={data.note.views}/>;
  }

  return (
    <>
      <Header>
        {data?.note && (
          <>
            <DeleteNote id={id!}/>
            <Share id={id!} password={key}/>
          </>
        )}
        <ButtonLink to="/" type="dark">
          New note
        </ButtonLink>
      </Header>

      <KeyModal isVisible={isVisible} onContinue={handleContinue} onClose={handleClose}/>

      <PageContainer>
        <Heading as="h2">View note</Heading>
        {component}
      </PageContainer>
    </>
  );
};

export default Note;
