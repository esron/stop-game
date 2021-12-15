import {
  IsAlphanumeric,
  IsArray,
  IsInt,
  IsNotEmpty,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { ArraySizeEquals } from './validators/array-size-equals';
import { IsSingleWord } from './validators/is-single-word';

export class CreateRoomDTO {
  @IsInt()
  @Min(1)
  @Max(12)
  @IsNotEmpty()
  rounds: number;

  @IsInt()
  @Min(1)
  @Max(12)
  @IsNotEmpty()
  maxPlayers: number;

  @IsAlphanumeric()
  password: string;

  @IsArray()
  @IsNotEmpty()
  @IsSingleWord({ each: true, message: 'each category must be a single word' })
  categories: string;

  @IsArray()
  @IsNotEmpty()
  @Matches(/[A-Z]/gm, { each: true })
  @ArraySizeEquals('rounds', {
    message: 'the size of letters must be equal to rounds',
  })
  letters: Array<string>;
}
