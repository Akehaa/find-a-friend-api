import { InMemoryPetAttachmentsRepository } from 'test/repositories/in-memory-pet-attachments-repository';
import { InMemoryPetsRepository } from 'test/repositories/in-memory-pets-repository';
import { EditPetUseCase } from './edit-pet';
import { makePet } from 'test/factories/make-pet';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makePetAttachment } from 'test/factories/make-pet-attachments';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemoryPetAttachmentsRepository: InMemoryPetAttachmentsRepository;
let sut: EditPetUseCase;

describe('Edit Pet', () => {
  beforeEach(() => {
    inMemoryPetAttachmentsRepository = new InMemoryPetAttachmentsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryPetAttachmentsRepository,
    );

    sut = new EditPetUseCase(
      inMemoryPetsRepository,
      inMemoryPetAttachmentsRepository,
    );
  });

  it('should be able to edit a question', async () => {
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
        attachmentId: new UniqueEntityId('2'),
      }),
    );

    await sut.execute({
      orgId: 'org-01',
      petId: newPet.id.toValue(),
      name: 'Test name',
      city: 'Test city',
      about: 'Test about',
      age: 5,
      weight: 10,
      breed: 'Test breed',
      size: 'big',
      attachmentsIds: ['1', '3'],
    });

    expect(inMemoryPetsRepository.items[0]).toMatchObject({
      name: 'Test name',
      city: 'Test city',
      about: 'Test about',
      age: 5,
      weight: 10,
      breed: 'Test breed',
      size: 'big',
    });

    expect(
      inMemoryPetsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2);
    expect(inMemoryPetsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ]);
  });

  it('should not be able to edit a pet from another org', async () => {
    const newPet = makePet(
      {
        orgId: new UniqueEntityId('org-01'),
      },
      new UniqueEntityId('pet-01'),
    );

    await inMemoryPetsRepository.create(newPet);

    const result = await sut.execute({
      orgId: 'org-02',
      petId: newPet.id.toValue(),
      name: 'Test name',
      city: 'Test city',
      about: 'Test about',
      age: 5,
      weight: 10,
      breed: 'Test breed',
      size: 'big',
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
