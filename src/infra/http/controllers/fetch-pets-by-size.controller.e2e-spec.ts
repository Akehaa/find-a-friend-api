import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { OrgFactory } from 'test/factories/make-org';
import { PetFactory } from 'test/factories/make-pet';
import request from 'supertest';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Fetch Pets By Size (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let orgFactory: OrgFactory;
  let petFactory: PetFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrgFactory, PetFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    orgFactory = moduleRef.get(OrgFactory);
    petFactory = moduleRef.get(PetFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[GET] /pets/size/:size', async () => {
    const org = await orgFactory.makePrismaOrg();

    const accessToken = jwt.sign({ sub: org.id.toString() });

    await Promise.all([
      petFactory.makePrismaPet({
        orgId: org.id,
        size: 'small',
      }),
      petFactory.makePrismaPet({
        orgId: org.id,
        size: 'big',
      }),
      petFactory.makePrismaPet({
        orgId: org.id,
        size: 'big',
      }),
    ]);

    const response = await request(app.getHttpServer())
      .get('/pets/size/big')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      pets: expect.arrayContaining([expect.objectContaining({ size: 'big' })]),
    });

    const petsOnDatabase = await prisma.pet.findMany({
      where: {
        size: 'big',
      },
    });

    expect(petsOnDatabase).toHaveLength(2);
  });
});
