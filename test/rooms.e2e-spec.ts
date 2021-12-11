import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from './../src/rooms/room.entity';
import { RoomsModule } from './../src/rooms/rooms.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RoomsModule],
    })
      .overrideProvider(getRepositoryToken(Room))
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/rooms (POST) should validate user input', () => {
    return request(app.getHttpServer())
      .post('/rooms')
      .expect(400)
      .expect({
        statusCode: 400,
        message: [
          'rounds must be a number conforming to the specified constraints',
          'maxPlayers must be a number conforming to the specified constraints',
          'password must contain only letters and numbers',
          'categories must be an array',
          'letters must be an array',
        ],
        error: 'Bad Request',
      });
  });
});
