import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Org } from '@/domain/main/enterprise/entities/org';
import { Org as PrismaUser, Prisma } from '@prisma/client';

export class PrismaOrgMapper {
  static toDomain(raw: PrismaUser): Org {
    return Org.create(
      {
        nameOfPersonResponsible: raw.nameOfPersonResponsible,
        email: raw.email,
        city: raw.city,
        cep: raw.cep,
        address: raw.address,
        whatsapp: raw.whatsapp,
        password: raw.password,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(org: Org): Prisma.OrgUncheckedCreateInput {
    return {
      id: org.id.toString(),
      nameOfPersonResponsible: org.nameOfPersonResponsible,
      email: org.email,
      city: org.city,
      cep: org.cep,
      address: org.address,
      whatsapp: org.whatsapp,
      password: org.password,
    };
  }
}
