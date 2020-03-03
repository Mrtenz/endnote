import { IsHexadecimal, IsNotEmpty, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Note } from '../../../models';

@InputType()
export class DeleteNoteInput implements Partial<Note> {
  @Field()
  @IsNotEmpty()
  @IsHexadecimal()
  @Length(1, 20016)
  id!: string;

  @Field()
  @IsNotEmpty()
  token!: string;
}
