import { InMemoryPetAttachmentsRepository } from 'test/repositories/in-memory-pet-attachments-repository';
import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository';
import { FetchPetsByNameUseCase } from './fetch-pets-by-name';
import { makePet } from 'test/factories/make-pet';

let inMemoryPetAttachmentsRepository: InMemoryPetAttachmentsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: FetchPetsByNameUseCase;

describe('Fetch Pets By Name', () => {
  beforeEach(() => {
    inMemoryPetAttachmentsRepository = new InMemoryPetAttachmentsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryPetAttachmentsRepository,
    );
    sut = new FetchPetsByNameUseCase(inMemoryPetsRepository);
  });

  it('should be able to fetch pets by name', async () => {
    await inMemoryPetsRepository.create(
      makePet({
        name: 'biscuit',
      }),
    );
    await inMemoryPetsRepository.create(
      makePet({
        name: 'moon',
      }),
    );
    await inMemoryPetsRepository.create(
      makePet({
        name: 'biscuit',
      }),
    );

    const result = await sut.execute({
      name: 'biscuit',
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.pets).toHaveLength(2);
  });
});
