export interface NoteModel {
  /**
   * Randomly generated hash for the note.
   */
  readonly id: string;

  /**
   * The title of the note.
   */
  readonly title: string;

  /**
   * The (encrypted) content of the note, as hexadecimal string.
   */
  readonly cipher: string;

  /**
   * The initialisation vector that was used to encrypt the content.
   */
  readonly iv: string;

  /**
   * Calculated HMAC hash of the content and iv.
   */
  readonly hmac: string;

  /**
   * The number of times the note has been viewed.
   */
  views: number;
}
