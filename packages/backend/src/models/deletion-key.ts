import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Note } from './note';

/**
 * Deletion key model, used to sign keys that can be used to delete notes.
 */
@Entity()
export class DeletionKey {
  @PrimaryColumn()
  readonly noteId!: string;

  @OneToOne(() => Note)
  @JoinColumn()
  readonly note!: Note;

  @Column()
  readonly privateKey!: string;

  @Column()
  readonly expiryDate!: number;
}

/**
 * Payload which is sent to the client as encrypted PASETO.
 */
export interface DeletionKeyPayload {
  /**
   * ID of the note to delete.
   */
  id: string;
}
