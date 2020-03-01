import { NoteModel } from '@endnote/common';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Note implements NoteModel {
  @Field()
  @PrimaryColumn()
  readonly id!: string;

  @Field()
  @Column()
  readonly title!: string;

  @Field()
  @Column()
  readonly cipher!: string;

  @Field()
  @Column()
  readonly iv!: string;

  @Field()
  @Column()
  readonly hmac!: string;

  @Field()
  @Column()
  views!: number;

  /**
   * Timestamp after which the note should be deleted, in milliseconds since Unix epoch.
   *
   * Note: this field is not exposed through the API and only used internally.
   */
  @Column()
  readonly deleteAfter!: number;

  /**
   * The number of views after which the note should be deleted. If null, the note should never be deleted.
   *
   * Note: this field is not exposed through the API and only used internally.
   */
  @Column()
  maxViews?: number;
}
