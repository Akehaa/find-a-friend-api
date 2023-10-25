import { DomainEvents } from '@/core/events/domain-events';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { PetAttachmentsRepository } from '@/domain/main/application/repositories/pet-attachments-repository';
import { PetsRepository } from '@/domain/main/application/repositories/pets-repository';
import { Pet } from '@/domain/main/enterprise/entities/pet';

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(private petAttachmentsRepository: PetAttachmentsRepository) {}

  async findById(id: string) {
    const pet = this.items.find((item) => item.id.toString() === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findManyByOrgId(orgId: string, { page }: PaginationParams) {
    const pets = this.items
      .filter((item) => item.orgId.toString() === orgId)
      .slice((page - 1) * 20, page * 20);

    return pets;
  }

  async findManyByOrgCity(orgCity: string, { page }: PaginationParams) {
    const pets = this.items
      .filter((item) => item.orgCity === orgCity)
      .slice((page - 1) * 20, page * 20);

    return pets;
  }

  async findManyByAge({ page }: PaginationParams, age?: number) {
    const pets = this.items
      .filter((item) => item.age === age)
      .slice((page - 1) * 20, page * 20);

    return pets;
  }

  async create(pet: Pet) {
    this.items.push(pet);

    DomainEvents.dispatchEventsForAggregate(pet.id);
  }

  async save(pet: Pet) {
    const itemIndex = this.items.findIndex((item) => item.id === pet.id);

    this.items[itemIndex] = pet;

    DomainEvents.dispatchEventsForAggregate(pet.id);
  }

  async delete(pet: Pet) {
    const itemIndex = this.items.findIndex((item) => item.id === pet.id);

    this.items.splice(itemIndex, 1);

    this.petAttachmentsRepository.deleteManyByPetId(pet.id.toString());
  }
}
