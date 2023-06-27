import { Test, TestingModule } from '@nestjs/testing';
import { ReviewResolver } from './review.resolver';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import * as request from 'supertest';

describe('ReviewResolver', () => {
  let app: INestApplication;
  let accessToken: string;
  let gameId: string;

  // TODO: drop collections before start
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    const fakeUser = {
      email: 'mee.moozeh@gmail.com', // TODO: generate random email
      password: 'Mehdi@123456',
    };
    const newUser = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        mutation {
          register(registerInput: {
            email: "${fakeUser.email}",
            password: "${fakeUser.password}",
          }) {
            _id
            token
          }
        }`,
      })
      .expect(200);
    accessToken = newUser.body.data.register.token;
    const newGame = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
        mutation {
          newGame(newGameInput: {
            title: "game for test 1"
            averageRating: 3.5,
            description: "awesome game",
            releaseDate: "2023-12-15",
          }) {
            _id
          }
        }`,
      })
      .expect(200);
    gameId = newGame.body.data.newGame._id;
  });

  test('Post a new review', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: `
        mutation {
          newReview(NewReviewInput: {
            gameId: "${gameId}",
            rating: 4.5,
            comment: "awesome game",
          }) {
            _id
          }
        }`,
      })
      .expect(200);
    console.log(response.body.data.newReview._id);
  });

  afterAll(async () => {
    await app.close();
  });
});
