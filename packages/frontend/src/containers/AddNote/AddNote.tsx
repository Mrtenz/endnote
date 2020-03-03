import { useMutation } from '@apollo/client';
import { encrypt, generateKey, generatePassword, hexifyObject, NoteModel } from '@endnote/common';
import { RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, useState } from 'react';
import AddNoteForm, { FormData } from '../../components/AddNoteForm';
import Header from '../../components/Header';
import Card from '../../components/ui/Card';
import Heading from '../../components/ui/Heading';
import PageContainer from '../../components/ui/PageContainer';
import { useDispatch, useSelector } from '../../hooks';
import { addToken } from '../../store/tokens';
import addNoteQuery from './AddNote.query.gql';
import CaptchaModal from './CaptchaModal';
import Settings from './Settings';

interface AddNoteQueryData {
  addNote: Pick<NoteModel, 'id'> & {
    token: string;
    expiryDate: number;
  };
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
  const [formData, setFormData] = useState<FormData>();
  const [isVisible, setVisible] = useState<boolean>(false);
  const [addNote, { loading }] = useMutation<AddNoteQueryData, AddNoteVariables>(addNoteQuery);
  const { deleteAfter, maxViews } = useSelector(state => state.settings);
  const dispatch = useDispatch();

  const handleSubmit = (data: FormData) => {
    setFormData(data);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleComplete = (token: string) => {
    setVisible(false);

    const password = generatePassword();
    const salt = generatePassword();

    generateKey(password, salt)
      .then(key => encrypt(formData!.content, key))
      .then(hexifyObject)
      .then(input =>
        addNote({
          variables: {
            input: {
              ...input,
              title: formData!.title,
              deleteAfter,
              maxViews: maxViews === 0 ? undefined : maxViews,
              token
            }
          }
        })
      )
      .then(({ data }) => {
        if (data) {
          dispatch(
            addToken({
              id: data.addNote.id,
              token: data.addNote.token,
              expiryDate: data.addNote.expiryDate
            })
          );
          return navigate?.(`/${data.addNote.id}#${password}${salt}`);
        }
      });
  };

  return (
    <>
      <Header>
        <Settings />
      </Header>

      <CaptchaModal isVisible={isVisible} onClose={handleClose} onComplete={handleComplete} />

      <PageContainer>
        <Heading as="h2">New note</Heading>
        <Card grow={true}>
          <AddNoteForm isLoading={loading} onSubmit={handleSubmit} />
        </Card>
      </PageContainer>
    </>
  );
};

export default AddNote;
