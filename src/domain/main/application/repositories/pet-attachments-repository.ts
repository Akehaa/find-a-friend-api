import { PetAttachment } from '../../enterprise/entities/pet-attachment';

export abstract class PetAttachmentsRepository {
  abstract createMany(attachments: PetAttachment[]): Promise<void>;
  abstract deleteMany(attachments: PetAttachment[]): Promise<void>;

  abstract findManyByPetId(petId: string): Promise<PetAttachment[]>;
  abstract deleteManyByPetId(petId: string): Promise<void>;
}
