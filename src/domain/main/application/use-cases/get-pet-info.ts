import { Either, left, right } from '@/core/either';
import { Pet } from '../../enterprise/entities/pet';
import { PetsRepository } from '../repositories/pets-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetPetInfoUseCaseRequest {
  petId: string;
}

type GetPetInfoUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    pet: Pet;
  }
>;

export class GetPetInfoUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetInfoUseCaseRequest): Promise<GetPetInfoUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      return left(new ResourceNotFoundError());
    }

    return right({
      pet,
    });
  }
}
