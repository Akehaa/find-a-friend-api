import { Either, right } from '@/core/either';
import { Pet } from '../../enterprise/entities/pet';
import { PetsRepository } from '../repositories/pets-repository';
import { Injectable } from '@nestjs/common';

interface FetchPetsByAgeUseCaseRequest {
  age?: string;
  page: number;
}

type FetchPetsByAgeUseCaseResponse = Either<
  null,
  {
    pets: Pet[];
  }
>;
@Injectable()
export class FetchPetsByAgeUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    page,
  }: FetchPetsByAgeUseCaseRequest): Promise<FetchPetsByAgeUseCaseResponse> {
    const pets = await this.petsRepository.findManyByAge({ page }, age);
    return right({
      pets,
    });
  }
}
