import { Either, left, right } from '@/core/either';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { PetsRepository } from '../repositories/pets-repository';

interface DeletePetUseCaseRequest {
  orgId: string;
  petId: string;
}

type DeletePetUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>;

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgId,
    petId,
  }: DeletePetUseCaseRequest): Promise<DeletePetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      return left(new ResourceNotFoundError());
    }

    if (orgId !== pet.orgId.toString()) {
      return left(new NotAllowedError());
    }

    await this.petsRepository.delete(pet);

    return right({});
  }
}
