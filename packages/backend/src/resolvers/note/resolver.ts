import { generatePassword, getTimestamp } from '@endnote/common';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Note } from '../../models';
import { NoteInput } from './note-input';

@Resolver(() => Note)
export class NoteResolver {
  constructor(@InjectRepository(Note) private readonly noteRepository: Repository<Note>) {}

  /**
   * Get a note by ID. May return undefined if the Note could not be found.
   *
   * @param {number} id
   * @return {Promise<Note>}
   */
  @Query(() => Note, { nullable: true })
  async note(@Arg('id', () => String) id: string): Promise<Note | undefined> {
    const note = await this.noteRepository.findOne(id);
    if (note) {
      note.views++;
      await this.noteRepository.save(note);

      // `+1` because the note will always be seen once after creating it
      if (note.maxViews && note.views > BigInt(note.maxViews) + 1n) {
        await this.noteRepository.delete(note);
      }

      return note;
    }

    return undefined;
  }

  /**
   * Create a new note. The ID is automatically generated.
   *
   * @param {NoteInput} input
   * @return {Promise<Note>}
   */
  @Mutation(() => Note)
  async addNote(@Arg('note') { deleteAfter, token, ...rest }: NoteInput): Promise<Note> {
    const id = generatePassword();

    const note = this.noteRepository.create({
      ...rest,
      id,
      deleteAfter: getTimestamp(deleteAfter)
    });

    return this.noteRepository.save(note);
  }
}
