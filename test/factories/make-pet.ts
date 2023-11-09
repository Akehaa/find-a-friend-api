import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Pet, PetProps } from '@/domain/main/enterprise/entities/pet';
import { PrismaPetMapper } from '@/infra/database/prisma/mappers/prisma-pet-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

export function makePet(override: Partial<PetProps> = {}, id?: UniqueEntityId) {
  const pet = Pet.create(
    {
      orgId: new UniqueEntityId(),
      name: faker.person.firstName(),
      city: faker.location.city(),
      about: faker.lorem.text(),
      age: faker.string.numeric(),
      weight: faker.string.numeric(),
      breed: faker.animal.dog(),
      size: 'big',
      ...override,
    },
    id,
  );

  return pet;
}

@Injectable()
export class PetFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPet(data: Partial<PetProps> = {}): Promise<Pet> {
    const pet = makePet(data);

    await this.prisma.pet.create({
      data: PrismaPetMapper.toPrisma(pet),
    });

    return pet;
  }
}
