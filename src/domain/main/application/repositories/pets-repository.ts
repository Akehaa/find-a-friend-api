import { Pet } from '../../enterprise/entities/pet';
import { PaginationParams } from '@/core/repositories/pagination-params';

export abstract class PetsRepository {
  abstract findById(id: string): Promise<Pet | null>;
  abstract findManyByOrgId(
    orgId: string,
    params: PaginationParams,
  ): Promise<Pet[]>;

  abstract findManyByCity(
    city: string,
    params: PaginationParams,
  ): Promise<Pet[]>;

  abstract findManyByName(
    params: PaginationParams,
    name?: string,
  ): Promise<Pet[]>;

  abstract findManyByAge(
    params: PaginationParams,
    age?: string,
  ): Promise<Pet[]>;

  abstract findManyByWeight(
    params: PaginationParams,
    weight?: string,
  ): Promise<Pet[]>;

  abstract findManyByBreed(
    params: PaginationParams,
    breed?: string,
  ): Promise<Pet[]>;

  abstract findManyBySize(
    params: PaginationParams,
    size?: string,
  ): Promise<Pet[]>;

  abstract create(pet: Pet): Promise<void>;
  abstract save(pet: Pet): Promise<void>;
  abstract delete(pet: Pet): Promise<void>;
}
