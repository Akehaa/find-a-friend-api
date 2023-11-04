import { InMemoryPetAttachmentsRepository } from './../../../../../test/repositories/in-memory-pet-attachments-repository';
import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository';
import { FetchPetsByCityUseCase } from './fetch-pets-by-city';
import { makePet } from 'test/factories/make-pet';

let inMemoryPetAttachmentsRepository: InMemoryPetAttachmentsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: FetchPetsByCityUseCase;

describe('Fetch Pets By City', () => {
  beforeEach(() => {
    inMemoryPetAttachmentsRepository = new InMemoryPetAttachmentsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryPetAttachmentsRepository,
    );
    sut = new FetchPetsByCityUseCase(inMemoryPetsRepository);
  });

  it('should be able to fetch pets by city', async () => {
    await inMemoryPetsRepository.create(
      makePet({
        city: 'city-01',
      }),
    );
    await inMemoryPetsRepository.create(
      makePet({
        city: 'city-01',
      }),
    );
    await inMemoryPetsRepository.create(
      makePet({
        city: 'city-03',
      }),
    );

    const result = await sut.execute({
      city: 'city-01',
      page: 1,
    });

    expect(result.value?.pets).toHaveLength(2);
  });

  it('should be able to fetch paginated pets', async () => {
    for (let i = 1; i <= 23; i++) {
      await inMemoryPetsRepository.create(
        makePet({
          city: 'city-01',
        }),
      );
    }

    const result = await sut.execute({
      city: 'city-01',
      page: 2,
    });

    expect(result.value?.pets).toHaveLength(3);
  });
});
