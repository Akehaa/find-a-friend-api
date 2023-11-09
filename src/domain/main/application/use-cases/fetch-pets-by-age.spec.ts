import { InMemoryPetAttachmentsRepository } from 'test/repositories/in-memory-pet-attachments-repository';
import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository';
import { FetchPetsByAgeUseCase } from './fetch-pets-by-age';
import { makePet } from 'test/factories/make-pet';

let inMemoryPetAttachmentsRepository: InMemoryPetAttachmentsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: FetchPetsByAgeUseCase;

describe('Fetch Pets By Age', () => {
  beforeEach(() => {
    inMemoryPetAttachmentsRepository = new InMemoryPetAttachmentsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryPetAttachmentsRepository,
    );
    sut = new FetchPetsByAgeUseCase(inMemoryPetsRepository);
  });

  it('should be able to fetch pets by age', async () => {
    await inMemoryPetsRepository.create(
      makePet({
        age: '4',
      }),
    );
    await inMemoryPetsRepository.create(
      makePet({
        age: '8',
      }),
    );
    await inMemoryPetsRepository.create(
      makePet({
        age: '4',
      }),
    );

    const result = await sut.execute({
      age: '4',
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.pets).toHaveLength(2);
  });
});
