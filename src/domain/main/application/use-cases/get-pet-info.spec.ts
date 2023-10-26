import { InMemoryPetAttachmentsRepository } from 'test/repositories/in-memory-pet-attachments-repository';
import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository';
import { GetPetInfoUseCase } from './get-pet-info';
import { makePet } from 'test/factories/make-pet';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error';

let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemoryPetAttachmentsRepository: InMemoryPetAttachmentsRepository;

let sut: GetPetInfoUseCase;

describe('Get Pet Info Use Case', () => {
  beforeEach(() => {
    inMemoryPetAttachmentsRepository = new InMemoryPetAttachmentsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryPetAttachmentsRepository,
    );

    sut = new GetPetInfoUseCase(inMemoryPetsRepository);
  });

  it('should be able to get a pet info by id', async () => {
    await inMemoryPetsRepository.create(
      makePet({}, new UniqueEntityId('pet-01')),
    );
    await inMemoryPetsRepository.create(
      makePet({}, new UniqueEntityId('pet-02')),
    );

    const result = await sut.execute({
      petId: 'pet-01',
    });

    expect(result.isRight()).toBe(true);
  });

  it('should not be able tyo get a pet with wrong id', async () => {
    await inMemoryPetsRepository.create(
      makePet({}, new UniqueEntityId('pet-01')),
    );

    const result = await sut.execute({
      petId: 'pet-02',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
