import { Either, right } from '@/core/either';
import { Pet } from '../../enterprise/entities/pet';
import { PetsRepository } from '../repositories/pets-repository';
import { Injectable } from '@nestjs/common';

interface FetchPetsByWeightUseCaseRequest {
  weight?: string;
  page: number;
}

type FetchPetsByWeightUseCaseResponse = Either<
  null,
  {
    pets: Pet[];
  }
>;
@Injectable()
export class FetchPetsByWeightUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    weight,
    page,
  }: FetchPetsByWeightUseCaseRequest): Promise<FetchPetsByWeightUseCaseResponse> {
    const pets = await this.petsRepository.findManyByWeight({ page }, weight);
    return right({
      pets,
    });
  }
}
