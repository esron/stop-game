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
          'rounds should not be empty',
          'rounds must not be greater than 12',
          'rounds must not be less than 1',
          'rounds must be an integer number',
          'maxPlayers should not be empty',
          'maxPlayers must not be greater than 12',
          'maxPlayers must not be less than 1',
          'maxPlayers must be an integer number',
          'password must contain only letters and numbers',
          'each category must be a single word',
          'categories should not be empty',
          'categories must be an array',
          'the size of letters must be equal to rounds',
          'each value in letters must be shorter than or equal to 1 characters',
          'each value in letters must be longer than or equal to 1 characters',
          'letters should not be empty',
          'letters must be an array',
        ],
        error: 'Bad Request',
      });
  });

  it('/rooms (POST) should validate letters', () => {
    return request(app.getHttpServer())
      .post('/rooms')
      .send({
        rounds: 3,
        maxPlayers: 5,
        password: 'blabla15',
        categories: ['cars', 'names', 'actors'],
        letters: ['not valiD', 'C', 'Z', 'A'],
      })
      .expect(400)
      .expect({
        statusCode: 400,
        message: [
          'the size of letters must be equal to rounds',
          'each value in letters must be shorter than or equal to 1 characters',
        ],
        error: 'Bad Request',
      });
  });
});
