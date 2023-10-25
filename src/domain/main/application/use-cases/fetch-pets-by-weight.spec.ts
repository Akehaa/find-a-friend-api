import { InMemoryPetAttachmentsRepository } from 'test/repositories/in-memory-pet-attachments-repository';
import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository';
import { FetchPetsByWeightUseCase } from './fetch-pets-by-weight';
import { makePet } from 'test/factories/make-pet';

let inMemoryPetAttachmentsRepository: InMemoryPetAttachmentsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: FetchPetsByWeightUseCase;

describe('Fetch Pets By Weight', () => {
  beforeEach(() => {
    inMemoryPetAttachmentsRepository = new InMemoryPetAttachmentsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryPetAttachmentsRepository,
    );
    sut = new FetchPetsByWeightUseCase(inMemoryPetsRepository);
  });

  it('should be able to fetch pets by weight', async () => {
    await inMemoryPetsRepository.create(
      makePet({
        weight: 8,
      }),
    );
    await inMemoryPetsRepository.create(
      makePet({
        weight: 15,
      }),
    );
    await inMemoryPetsRepository.create(
      makePet({
        weight: 8,
      }),
    );

    const result = await sut.execute({
      weight: 8,
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.pets).toHaveLength(2);
  });
});
