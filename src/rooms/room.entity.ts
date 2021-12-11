import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rounds: number;

  @Column()
  maxPlayers: number;

  @Column()
  password: string;

  @Column()
  categories: string;

  @Column()
  letters: string;
}
