import { PetAttachmentsRepository } from '@/domain/main/application/repositories/pet-attachments-repository';
import { PetAttachment } from '@/domain/main/enterprise/entities/pet-attachment';

export class InMemoryPetAttachmentsRepository
  implements PetAttachmentsRepository
{
  public items: PetAttachment[] = [];

  async findManyByPetId(petId: string) {
    const petAttachments = this.items.filter(
      (item) => item.petId.toString() === petId,
    );

    return petAttachments;
  }

  async deleteManyByPetId(petId: string) {
    const petAttachments = this.items.filter(
      (item) => item.petId.toString() !== petId,
    );

    this.items = petAttachments;
  }
}
