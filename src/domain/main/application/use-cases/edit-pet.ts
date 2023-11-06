import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { Pet } from '../../enterprise/entities/pet';
import { PetsRepository } from '../repositories/pets-repository';
import { PetAttachmentsRepository } from '../repositories/pet-attachments-repository';
import { PetAttachmentList } from '../../enterprise/entities/pet-attachment-list';
import { PetAttachment } from '../../enterprise/entities/pet-attachment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Injectable } from '@nestjs/common';

interface EditPetUseCaseRequest {
  orgId: string;
  petId: string;
  name: string;
  city: string;
  about: string;
  age: number;
  weight: number;
  breed: string;
  size: string;
  attachmentsIds: string[];
}

type EditPetUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    pet: Pet;
  }
>;
@Injectable()
export class EditPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private petAttachmentsRepository: PetAttachmentsRepository,
  ) {}

  async execute({
    orgId,
    petId,
    name,
    city,
    about,
    age,
    weight,
    breed,
    size,
    attachmentsIds,
  }: EditPetUseCaseRequest): Promise<EditPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      return left(new ResourceNotFoundError());
    }

    if (orgId !== pet.orgId.toString()) {
      return left(new NotAllowedError());
    }

    const currentPetAttachments =
      await this.petAttachmentsRepository.findManyByPetId(petId);

    const petAttachmentList = new PetAttachmentList(currentPetAttachments);

    const petAttachments = attachmentsIds.map((attachmentId) => {
      return PetAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        petId: pet.id,
      });
    });

    petAttachmentList.update(petAttachments);

    pet.name = name;
    pet.city = city;
    pet.about = about;
    pet.age = age;
    pet.weight = weight;
    pet.breed = breed;
    pet.size = size;
    pet.attachments = petAttachmentList;

    await this.petsRepository.save(pet);

    return right({
      pet,
    });
  }
}
