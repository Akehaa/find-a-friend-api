import { hash } from 'bcryptjs';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { OrgFactory } from 'test/factories/make-org';

describe('Authenticate (E2E)', () => {
  let app: INestApplication;
  let orgFactory: OrgFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrgFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    orgFactory = moduleRef.get(OrgFactory);

    await app.init();
  });

  test('[POST] /sessions', async () => {
    await orgFactory.makePrismaOrg({
      email: 'johndoe@example.com',
      password: await hash('123456', 8),
    });

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
