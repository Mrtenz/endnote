import { DELETE_AFTER_VALUES } from '@endnote/common';
import {
  IsByteLength,
  IsHexadecimal,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Note } from '../../../models';
import { IsValidToken } from '../../../utils/recaptcha';

@InputType()
export class AddNoteInput implements Partial<Note> {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  title!: string;

  @Field()
  @IsNotEmpty()
  @IsHexadecimal()
  @IsByteLength(1, 20016)
  cipher!: string;

  @Field()
  @IsNotEmpty()
  @IsHexadecimal()
  @Length(32, 32)
  iv!: string;

  @Field()
  @IsNotEmpty()
  @IsHexadecimal()
  @Length(128, 128)
  hmac!: string;

  /**
   * Number of days after which a note should be deleted. This field should be parsed to a valid Unix timestamp before
   * inserting in the database.
   */
  @Field()
  @IsNotEmpty()
  @IsNumber()
  @IsIn(DELETE_AFTER_VALUES)
  deleteAfter!: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(2147483647)
  maxViews?: number;

  /**
   * Google reCAPTCHA token. This is not inserted into the database and is only used for validation.
   */
  @Field()
  @IsNotEmpty()
  @IsValidToken()
  token!: string;
}
