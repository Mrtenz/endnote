import { useMutation } from '@apollo/client';
import { encrypt, generateKey, generatePassword, hexifyObject, NoteModel } from '@endnote/common';
import { RouteComponentProps } from '@reach/router';
import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import Field from '../../components/Field';
import Header from '../../components/Header';
import HiddenInput from '../../components/HiddenInput';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Heading from '../../components/ui/Heading';
import PageContainer from '../../components/ui/PageContainer';
import TextArea from '../../components/ui/TextArea';
import { useSelector } from '../../hooks';
import addNoteQuery from './AddNote.query.gql';
import CaptchaModal from './CaptchaModal';
import Settings from './Settings';
import { DEFAULT_NOTE_TITLE } from '../../constants';

interface AddNoteQueryData {
  addNote: Pick<NoteModel, 'id'>;
}

interface AddNoteVariables {
  input: Pick<NoteModel, 'title' | 'cipher' | 'iv' | 'hmac'> & {
    deleteAfter: number;
    maxViews?: number;
    token: string;
  };
}

type Props = RouteComponentProps;

const AddNote: FunctionComponent<Props> = ({ navigate }) => {
  const [title, setTitle] = useState<string>(DEFAULT_NOTE_TITLE);
  const [content, setContent] = useState<string>('');
  const [isVisible, srtVisible] = useState<boolean>(false);
  const [addNote, { loading }] = useMutation<AddNoteQueryData, AddNoteVariables>(addNoteQuery);
  const { deleteAfter, maxViews } = useSelector(state => state.settings);

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleSubmit = () => {
    srtVisible(true);
  };

  const handleClose = () => {
    srtVisible(false);
  };

  const handleComplete = (token: string) => {
    srtVisible(false);

    const password = generatePassword();
    const salt = generatePassword();

    generateKey(password, salt)
      .then(key => encrypt(content, key))
      .then(hexifyObject)
      .then(input =>
        addNote({
          variables: {
            input: {
              ...input,
              title,
              deleteAfter,
              maxViews: maxViews === 0 ? undefined : maxViews,
              token
            }
          }
        })
      )
      .then(({ data }) => {
        if (data) {
          return navigate?.(`/${data?.addNote.id}#${password}${salt}`);
        }
      });
  };

  return (
    <>
      <Header>
        <Settings />
        <Button type="primary" onClick={handleSubmit} disabled={loading}>
          Save
        </Button>
      </Header>

      <CaptchaModal isVisible={isVisible} onClose={handleClose} onComplete={handleComplete} />

      <PageContainer>
        <Heading as="h2">New note</Heading>
        <Card grow={true}>
          <HiddenInput value={title} defaultValue={DEFAULT_NOTE_TITLE} onChange={handleChangeTitle} />
          <Field value={content} limit={20000}>
            <TextArea as="textarea" value={content} onChange={handleChange} placeholder="Write some text here..." />
          </Field>
        </Card>
      </PageContainer>
    </>
  );
};

export default AddNote;
