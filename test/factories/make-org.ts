import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Org, OrgProps } from '@/domain/main/enterprise/entities/org';
import { PrismaOrgMapper } from '@/infra/database/prisma/mappers/prisma-org-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

export function makeOrg(override: Partial<OrgProps> = {}, id?: UniqueEntityId) {
  const org = Org.create(
    {
      nameOfPersonResponsible: faker.person.firstName(),
      email: faker.internet.email(),
      cep: '95034-574',
      address: faker.location.city(),
      whatsapp: faker.phone.number(),
      password: '123456',
      ...override,
    },
    id,
  );

  return org;
}

@Injectable()
export class OrgFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaOrg(data: Partial<OrgProps> = {}): Promise<Org> {
    const org = makeOrg(data);

    await this.prisma.org.create({
      data: PrismaOrgMapper.toPrisma(org),
    });

    return org;
  }
}
