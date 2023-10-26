import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Org, OrgProps } from '@/domain/main/enterprise/entities/org';
import { faker } from '@faker-js/faker';

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
