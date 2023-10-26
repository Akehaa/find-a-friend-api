import { InMemoryPetAttachmentsRepository } from 'test/repositories/in-memory-pet-attachments-repository';
import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository';
import { DeletePetUseCase } from './delete-pet';
import { makePet } from 'test/factories/make-pet';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makePetAttachment } from 'test/factories/make-pet-attachments';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemoryPetAttachmentsRepository: InMemoryPetAttachmentsRepository;

let sut: DeletePetUseCase;

describe('Delete pet', () => {
  beforeEach(() => {
    inMemoryPetAttachmentsRepository = new InMemoryPetAttachmentsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryPetAttachmentsRepository,
    );

    sut = new DeletePetUseCase(inMemoryPetsRepository);
  });

  it('should be able to delete a pet', async () => {
    const newPet = makePet(
      {
        orgId: new UniqueEntityId('org-01'),
      },
      new UniqueEntityId('pet-01'),
    );

    await inMemoryPetsRepository.create(newPet);

    inMemoryPetAttachmentsRepository.items.push(
      makePetAttachment({
        petId: newPet.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makePetAttachment({
        petId: newPet.id,
        attachmentId: new UniqueEntityId('3'),
      }),
    );

    await sut.execute({
      orgId: 'org-01',
      petId: 'pet-01',
    });

    expect(inMemoryPetsRepository.items).toHaveLength(0);
    expect(inMemoryPetAttachmentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a pet from another org', async () => {
    const newPet = makePet(
      {
        orgId: new UniqueEntityId('org-01'),
      },
      new UniqueEntityId('pet-01'),
    );

    await inMemoryPetsRepository.create(newPet);

    const result = await sut.execute({
      orgId: 'org-02',
      petId: 'pet-01',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
