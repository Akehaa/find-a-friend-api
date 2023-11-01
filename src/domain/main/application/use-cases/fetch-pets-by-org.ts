import { Either, right } from '@/core/either';
import { Pet } from '../../enterprise/entities/pet';
import { PetsRepository } from '../repositories/pets-repository';
import { Injectable } from '@nestjs/common';

interface FechPetsByOrgUseCaseRequest {
  orgId: string;
  page: number;
}

type FechPetsByOrgUseCaseResponse = Either<
  null,
  {
    pets: Pet[];
  }
>;
@Injectable()
export class FetchPetsByOrgUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgId,
    page,
  }: FechPetsByOrgUseCaseRequest): Promise<FechPetsByOrgUseCaseResponse> {
    const pets = await this.petsRepository.findManyByOrgId(orgId, {
      page,
    });

    return right({
      pets,
    });
  }
}
