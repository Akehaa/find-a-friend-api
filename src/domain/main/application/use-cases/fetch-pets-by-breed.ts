import { Either, right } from '@/core/either';
import { Pet } from '../../enterprise/entities/pet';
import { PetsRepository } from '../repositories/pets-repository';
import { Injectable } from '@nestjs/common';

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
@Injectable()
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
