import { IsAlphanumeric, IsArray, IsNumber } from 'class-validator';

export class CreateRoomDTO {
  @IsNumber()
  rounds: number;

  @IsNumber()
  maxPlayers: number;

  @IsAlphanumeric()
  password: string;

  @IsArray()
  categories: string;

  @IsArray()
  letters: string;
}
