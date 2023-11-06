import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Pet } from '@/domain/main/enterprise/entities/pet';
import { Prisma, Pet as PrismaPet } from '@prisma/client';

export class PrismaPetMapper {
  static toDomain(raw: PrismaPet): Pet {
    return Pet.create(
      {
        orgId: new UniqueEntityId(raw.orgId),
        name: raw.name,
        city: raw.city,
        about: raw.about,
        age: raw.age,
        weight: raw.weight,
        breed: raw.breed,
        size: raw.size,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(pet: Pet): Prisma.PetUncheckedCreateInput {
    return {
      id: pet.id.toString(),
      orgId: pet.orgId.toString(),
      name: pet.name,
      city: pet.city,
      about: pet.about,
      age: pet.age,
      weight: pet.weight,
      breed: pet.breed,
      size: pet.size,
    };
  }
}
