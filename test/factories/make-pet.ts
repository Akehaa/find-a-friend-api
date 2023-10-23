import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Pet, PetProps } from '@/domain/main/enterprise/entities/pet';
import { faker } from '@faker-js/faker';

export function makePet(override: Partial<PetProps> = {}, id?: UniqueEntityId) {
  const pet = Pet.create(
    {
      orgId: new UniqueEntityId(),
      orgCity: 'City 2',
      name: faker.person.firstName(),
      about: faker.lorem.text(),
      age: faker.number.int({ max: 25 }),
      weight: faker.number.int({ max: 100 }),
      breed: faker.animal.dog(),
      size: 'big',
      ...override,
    },
    id,
  );

  return pet;
}
