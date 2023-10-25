import { InMemoryPetAttachmentsRepository } from 'test/repositories/in-memory-pet-attachments-repository';
import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository';
import { FetchPetsByBreedUseCase } from './fetch-pets-by-breed';
import { makePet } from 'test/factories/make-pet';

let inMemoryPetAttachmentsRepository: InMemoryPetAttachmentsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: FetchPetsByBreedUseCase;

describe('Fetch Pets By Breed', () => {
  beforeEach(() => {
    inMemoryPetAttachmentsRepository = new InMemoryPetAttachmentsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryPetAttachmentsRepository,
    );
    sut = new FetchPetsByBreedUseCase(inMemoryPetsRepository);
  });

  it('should be able to fetch pets by breed', async () => {
    await inMemoryPetsRepository.create(
      makePet({
        breed: 'german shepherd',
      }),
    );
    await inMemoryPetsRepository.create(
      makePet({
        breed: 'siberian husky',
      }),
    );
    await inMemoryPetsRepository.create(
      makePet({
        breed: 'german shepherd',
      }),
    );

    const result = await sut.execute({
      breed: 'german shepherd',
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.pets).toHaveLength(2);
  });
});
