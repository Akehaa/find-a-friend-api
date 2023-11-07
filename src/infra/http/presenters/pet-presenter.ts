import { Pet } from '@prisma/client';

export class PetPresenter {
  static toHTTP(pet: Pet) {
    return {
      id: pet.id.toString(),
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
