import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { OrgFactory } from 'test/factories/make-org';
import { PetFactory } from 'test/factories/make-pet';
import request from 'supertest';

describe('Edit Pet (E2E)', () => {
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

  test('[PUT] /pets/:id', async () => {
    const org = await await orgFactory.makePrismaOrg();

    const accessToken = jwt.sign({ sub: org.id.toString() });

    const pet = await petFactory.makePrismaPet({
      orgId: org.id,
    });

    const petId = pet.id.toString();

    const response = await request(app.getHttpServer())
      .put(`/pets/${petId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Edited name',
        city: 'Edited city',
        about: 'Edited about',
        age: 5,
        weight: 13,
        breed: 'Edited breed',
        size: 'big',
      });

    expect(response.status).toBe(204);

    const petOnDatabase = await prisma.pet.findFirst({
      where: {
        name: 'Edited name',
        city: 'Edited city',
        about: 'Edited about',
        age: 5,
        weight: 13,
        breed: 'Edited breed',
        size: 'big',
      },
    });

    expect(petOnDatabase).toBeTruthy();
  });
});
