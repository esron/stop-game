import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDTO } from './create-room.dto';
import { Room } from './room.entity';

@Controller('rooms')
export class RoomsController {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  @Post()
  public async create(@Body() room: CreateRoomDTO) {
    return room;
  }
}
