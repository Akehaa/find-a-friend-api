import { Either, right } from '@/core/either';
import { Pet } from '../../enterprise/entities/pet';
import { PetsRepository } from '../repositories/pets-repository';

interface FetchPetsByNameUseCaseRequest {
  name?: string;
  page: number;
}

type FetchPetsByNameUseCaseResponse = Either<
  null,
  {
    pets: Pet[];
  }
>;

export class FetchPetsByNameUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    page,
  }: FetchPetsByNameUseCaseRequest): Promise<FetchPetsByNameUseCaseResponse> {
    const pets = await this.petsRepository.findManyByName({ page }, name);
    return right({
      pets,
    });
  }
}
