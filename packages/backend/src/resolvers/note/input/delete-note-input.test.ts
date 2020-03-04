import { DeleteNoteInput } from './delete-note-input';

describe('DeleteNoteInput', () => {
  it('validates the properties', () => {
    const input = new DeleteNoteInput();
    input.id = 'foo';
    input.token = 'bar';
  });
});
