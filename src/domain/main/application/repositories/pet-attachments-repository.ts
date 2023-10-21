import { PetAttachment } from '../../enterprise/entities/pet-attachment';

export abstract class PetAttachmentsRepository {
  abstract findManyByPetId(petId: string): Promise<PetAttachment[]>;
  abstract deleteManyByPetId(petId: string): Promise<void>;
}
