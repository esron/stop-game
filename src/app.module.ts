import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './rooms/room.entity';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    RoomsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'test',
      entities: [Room],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
