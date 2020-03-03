import React, { FunctionComponent, useEffect, useState } from 'react';
import deleteNoteQuery from './DeleteNote.query.gql';
import { useMutation } from '@apollo/client';
import Delete from './Delete';
import { useDispatch, useSelector } from '../../hooks';
import { removeToken, Token } from '../../store/tokens';
import { useNavigate } from '@reach/router';

interface DeleteNoteVariables {
  input: {
    id: string;
    token: string;
  };
}

interface Props {
  id: string;
}

const DeleteNote: FunctionComponent<Props> = ({ id }) => {
  const [deleteNote] = useMutation<boolean, DeleteNoteVariables>(deleteNoteQuery);
  const [token, setToken] = useState<Token>();
  const tokens = useSelector(state => state.tokens);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(tokens[id]);
  }, [id]);

  const handleConfirm = () => {
    if (token) {
      deleteNote({
        variables: {
          input: {
            id,
            token: token.token
          }
        }
      })
        .then(() => {
          dispatch(removeToken(token));
        })
        .then(() => navigate('/'))
        // TODO: Error handling
        .catch(console.error)
    }
  };

  if (token) {
    return <Delete onConfirm={handleConfirm}/>;
  }

  return null;
};

export default DeleteNote;
