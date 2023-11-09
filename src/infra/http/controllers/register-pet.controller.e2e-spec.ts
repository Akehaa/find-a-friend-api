import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { OrgFactory } from 'test/factories/make-org';
import request from 'supertest';

describe('Register Pet (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let orgFactory: OrgFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrgFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    orgFactory = moduleRef.get(OrgFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[POST] /pets', async () => {
    const org = await orgFactory.makePrismaOrg();

    const accessToken = jwt.sign({ sub: org.id.toString() });

    const response = await request(app.getHttpServer())
      .post('/pets')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'New pet',
        about: 'New about',
        city: 'New City',
        age: '5',
        weight: '19',
        breed: 'Husky',
        size: 'big',
      });

    expect(response.statusCode).toBe(201);

    const petOnDatabase = await prisma.pet.findFirst({
      where: {
        name: 'New pet',
      },
    });

    expect(petOnDatabase).toBeTruthy();
  });
});
