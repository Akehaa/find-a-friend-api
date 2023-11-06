import { Attachment as PrismaAttachment } from '@prisma/client';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { PetAttachment } from '@/domain/main/enterprise/entities/pet-attachment';

export class PrismaPetAttachmentMapper {
  static toDomain(raw: PrismaAttachment): PetAttachment {
    if (!raw.petId) {
      throw new Error('Invalid attachment type.');
    }

    return PetAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        petId: new UniqueEntityId(raw.petId),
      },
      new UniqueEntityId(raw.id),
    );
  }
}
