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

  async createMany(attachments: PetAttachment[]): Promise<void> {
    this.items.push(...attachments);
  }

  async deleteMany(attachments: PetAttachment[]): Promise<void> {
    const petAttachments = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item));
    });

    this.items = petAttachments;
  }

  async deleteManyByPetId(petId: string) {
    const petAttachments = this.items.filter(
      (item) => item.petId.toString() !== petId,
    );

    this.items = petAttachments;
  }
}
