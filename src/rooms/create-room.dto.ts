import { IsAlphanumeric, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoomDTO {
  @IsNumber()
  @IsNotEmpty()
  rounds: number;

  @IsNumber()
  @IsNotEmpty()
  maxPlayers: number;

  @IsAlphanumeric()
  password: string;

  @IsArray()
  @IsNotEmpty()
  categories: string;

  @IsArray()
  @IsNotEmpty()
  letters: string;
}
