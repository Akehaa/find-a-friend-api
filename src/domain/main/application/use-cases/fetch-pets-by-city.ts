import { Either, right } from '@/core/either';
import { Pet } from '../../enterprise/entities/pet';
import { PetsRepository } from '../repositories/pets-repository';
import { Injectable } from '@nestjs/common';

interface FechPetsByCityUseCaseRequest {
  city: string;
  page: number;
}

type FechPetsByCityUseCaseResponse = Either<
  null,
  {
    pets: Pet[];
  }
>;
@Injectable()
export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
  }: FechPetsByCityUseCaseRequest): Promise<FechPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(city, {
      page,
    });

    return right({
      pets,
    });
  }
}
