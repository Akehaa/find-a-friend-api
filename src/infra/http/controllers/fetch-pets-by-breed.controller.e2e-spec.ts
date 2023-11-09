import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { OrgFactory } from 'test/factories/make-org';
import { PetFactory } from 'test/factories/make-pet';
import request from 'supertest';

describe('Fetch Pets By Breed (E2E)', () => {
  let app: INestApplication;
  let orgFactory: OrgFactory;
  let petFactory: PetFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrgFactory, PetFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    orgFactory = moduleRef.get(OrgFactory);
    petFactory = moduleRef.get(PetFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[GET] /pets/breed/:breed', async () => {
    const org = await orgFactory.makePrismaOrg();

    const accessToken = jwt.sign({ sub: org.id.toString() });

    await Promise.all([
      petFactory.makePrismaPet({
        orgId: org.id,
        breed: 'breed-01',
      }),
      petFactory.makePrismaPet({
        orgId: org.id,
        breed: 'breed-02',
      }),
      petFactory.makePrismaPet({
        orgId: org.id,
        breed: 'breed-02',
      }),
    ]);

    const response = await request(app.getHttpServer())
      .get('/pets/breed/breed-02')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      pets: expect.arrayContaining([
        expect.objectContaining({ breed: 'breed-02' }),
      ]),
    });
  });
});
