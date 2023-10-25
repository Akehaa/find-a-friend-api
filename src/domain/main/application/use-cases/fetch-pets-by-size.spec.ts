import { InMemoryPetAttachmentsRepository } from 'test/repositories/in-memory-pet-attachments-repository';
import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository';
import { FetchPetsBySizeUseCase } from './fetch-pets-by-size';
import { makePet } from 'test/factories/make-pet';

let inMemoryPetAttachmentsRepository: InMemoryPetAttachmentsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: FetchPetsBySizeUseCase;

describe('Fetch Pets By Size', () => {
  beforeEach(() => {
    inMemoryPetAttachmentsRepository = new InMemoryPetAttachmentsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryPetAttachmentsRepository,
    );
    sut = new FetchPetsBySizeUseCase(inMemoryPetsRepository);
  });

  it('should be able to fetch pets by size', async () => {
    await inMemoryPetsRepository.create(
      makePet({
        size: 'big',
      }),
    );
    await inMemoryPetsRepository.create(
      makePet({
        size: 'small',
      }),
    );
    await inMemoryPetsRepository.create(
      makePet({
        size: 'big',
      }),
    );

    const result = await sut.execute({
      size: 'big',
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.pets).toHaveLength(2);
  });
});
