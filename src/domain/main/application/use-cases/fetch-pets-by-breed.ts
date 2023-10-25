import { Either, right } from '@/core/either';
import { Pet } from '../../enterprise/entities/pet';
import { PetsRepository } from '../repositories/pets-repository';

interface FetchPetsByBreedUseCaseRequest {
  breed?: string;
  page: number;
}

type FetchPetsByBreedUseCaseResponse = Either<
  null,
  {
    pets: Pet[];
  }
>;

export class FetchPetsByBreedUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    breed,
    page,
  }: FetchPetsByBreedUseCaseRequest): Promise<FetchPetsByBreedUseCaseResponse> {
    const pets = await this.petsRepository.findManyByBreed({ page }, breed);
    return right({
      pets,
    });
  }
}
