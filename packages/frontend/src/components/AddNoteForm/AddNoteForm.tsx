import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { DEFAULT_NOTE_TITLE } from '../../constants';
import Field from '../Field';
import HiddenInput from '../HiddenInput';
import Button from '../ui/Button';
import TextArea from '../ui/TextArea';

export interface FormData {
  title: string;
  content: string;
}

interface Props {
  isLoading: boolean;

  onSubmit(data: FormData): void;
}

const AddNoteForm: FunctionComponent<Props> = ({ isLoading, onSubmit }) => {
  const [title, setTitle] = useState<string>(DEFAULT_NOTE_TITLE);
  const [content, setContent] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleClick = () => {
    onSubmit({ title, content });
  };

  return (
    <>
      <HiddenInput value={title} defaultValue={DEFAULT_NOTE_TITLE} onChange={setTitle} />
      <Field value={content} limit={20000} grow={true}>
        <TextArea as="textarea" value={content} onChange={handleChange} placeholder="Write some text here..." />
      </Field>
      <Button type="primary" onClick={handleClick} disabled={isLoading}>
        Save
      </Button>
    </>
  );
};

export default AddNoteForm;
