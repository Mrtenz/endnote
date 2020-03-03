import { Field, ObjectType } from 'type-graphql';
import { Note } from './note';

/**
 * Note with an extra token that is sent when a new note is created.
 */
@ObjectType()
export class NoteWithToken extends Note {
  @Field()
  readonly token!: string;

  @Field()
  readonly expiryDate!: number;
}
