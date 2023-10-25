import { Either, right } from '@/core/either';
import { Pet } from '../../enterprise/entities/pet';
import { PetsRepository } from '../repositories/pets-repository';

interface FetchPetsBySizeUseCaseRequest {
  size?: string;
  page: number;
}

type FetchPetsBySizeUseCaseResponse = Either<
  null,
  {
    pets: Pet[];
  }
>;

export class FetchPetsBySizeUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    size,
    page,
  }: FetchPetsBySizeUseCaseRequest): Promise<FetchPetsBySizeUseCaseResponse> {
    const pets = await this.petsRepository.findManyBySize({ page }, size);
    return right({
      pets,
    });
  }
}
