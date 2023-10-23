import { InMemoryPetAttachmentsRepository } from '../../../../../test/repositories/in-memory-pet-attachments-repository';
import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository';
import { makePet } from 'test/factories/make-pet';
import { FetchPetsByOrgUseCase } from './fetch-pets-by-org';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryPetAttachmentsRepository: InMemoryPetAttachmentsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: FetchPetsByOrgUseCase;

describe('Fetch Pets By Org', () => {
  beforeEach(() => {
    inMemoryPetAttachmentsRepository = new InMemoryPetAttachmentsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryPetAttachmentsRepository,
    );
    sut = new FetchPetsByOrgUseCase(inMemoryPetsRepository);
  });

  it('should be able to fetch pets by org', async () => {
    await inMemoryPetsRepository.create(
      makePet({
        orgId: new UniqueEntityId('org-01'),
      }),
    );
    await inMemoryPetsRepository.create(
      makePet({
        orgId: new UniqueEntityId('org-01'),
      }),
    );
    await inMemoryPetsRepository.create(
      makePet({
        orgId: new UniqueEntityId('org-03'),
      }),
    );

    const result = await sut.execute({
      orgId: 'org-01',
      page: 1,
    });

    expect(result.value?.pets).toHaveLength(2);
  });

  it('should be able to fetch paginated pets', async () => {
    for (let i = 1; i <= 23; i++) {
      await inMemoryPetsRepository.create(
        makePet({
          orgId: new UniqueEntityId('org-01'),
        }),
      );
    }

    const result = await sut.execute({
      orgId: 'org-01',
      page: 2,
    });

    expect(result.value?.pets).toHaveLength(3);
  });
});
