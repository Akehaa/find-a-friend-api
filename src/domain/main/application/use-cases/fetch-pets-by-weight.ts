import { Either, right } from '@/core/either';
import { Pet } from '../../enterprise/entities/pet';
import { PetsRepository } from '../repositories/pets-repository';

interface FetchPetsByWeightUseCaseRequest {
  weight?: number;
  page: number;
}

type FetchPetsByWeightUseCaseResponse = Either<
  null,
  {
    pets: Pet[];
  }
>;

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
