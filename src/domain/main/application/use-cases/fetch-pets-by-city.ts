import { Either, right } from '@/core/either';
import { Pet } from '../../enterprise/entities/pet';
import { PetsRepository } from '../repositories/pets-repository';
import { Injectable } from '@nestjs/common';

interface FechPetsByCityUseCaseRequest {
  orgCity: string;
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
    orgCity,
    page,
  }: FechPetsByCityUseCaseRequest): Promise<FechPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByOrgCity(orgCity, {
      page,
    });

    return right({
      pets,
    });
  }
}
