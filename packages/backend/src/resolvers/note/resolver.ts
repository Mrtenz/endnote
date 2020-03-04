import { generatePassword, getTimestamp } from '@endnote/common';
import { randomBytes } from 'crypto';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Connection, Repository } from 'typeorm';
import { InjectConnection, InjectRepository } from 'typeorm-typedi-extensions';
import { DeletionKey, DeletionKeyPayload, Note, NoteWithToken } from '../../models';
import { decryptToken, encryptToken } from '../../utils/tokens';
import { AddNoteInput, DeleteNoteInput } from './input';

@Resolver(() => Note)
export class NoteResolver {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
    @InjectRepository(DeletionKey) private readonly deletionKeyRepository: Repository<DeletionKey>
  ) {}

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
      // Note: `ts-jest` doesn't like the `1n` syntax so we need `BigInt(1)` here
      if (note.maxViews && note.views > BigInt(note.maxViews) + BigInt(1)) {
        await this.noteRepository.delete(note);
      }

      return note;
    }

    return undefined;
  }

  /**
   * Create a new note. The ID is automatically generated.
   *
   * @param {AddNoteInput} input
   * @return {Promise<NoteWithToken>}
   */
  @Mutation(() => NoteWithToken)
  async addNote(@Arg('note') { deleteAfter, token, ...rest }: AddNoteInput): Promise<NoteWithToken> {
    return this.connection.transaction(async entityManager => {
      const id = generatePassword();
      const timestamp = getTimestamp(deleteAfter);
      const note = entityManager.create(Note, {
        ...rest,
        id,
        deleteAfter: timestamp
      });

      const privateKey = randomBytes(32);
      const deletionKey = entityManager.create(DeletionKey, {
        note,
        privateKey: privateKey.toString('hex'),
        expiryDate: timestamp
      });

      await entityManager.save(note);
      await entityManager.save(deletionKey);

      const deletionKeyPayload = {
        id: note.id
      };

      return {
        ...note,
        token: await encryptToken<DeletionKeyPayload>(deletionKeyPayload, privateKey),
        expiryDate: timestamp
      };
    });
  }

  @Mutation(() => Boolean)
  async deleteNote(@Arg('note') { id, token }: DeleteNoteInput): Promise<boolean> {
    const deletionKey = await this.deletionKeyRepository.findOneOrFail(id, { relations: ['note'] });

    if (Date.now() > deletionKey.expiryDate) {
      await this.deletionKeyRepository.delete(deletionKey);
      throw new Error('Token is invalid: token has expired');
    }

    try {
      const key = Buffer.from(deletionKey.privateKey, 'hex');
      const payload = await decryptToken<DeletionKeyPayload>(token, key);
      if (!payload.id) {
        throw new Error('Token is invalid: missing payload ID');
      }

      if (payload.id !== id) {
        throw new Error('Token is invalid: payload ID does not match with requested ID');
      }

      await this.noteRepository.delete(deletionKey.note);

      return true;
    } catch {
      throw new Error('Token is invalid: failed to decrypt the token payload');
    }

    return false;
  }
}
