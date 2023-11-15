import { Prisma, Attachment as PrismaAttachment } from '@prisma/client';
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

  static toPrismaUpdateMany(
    attachments: PetAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString();
    });

    return {
      where: {
        id: {
          in: attachmentIds,
        },
      },
      data: {
        petId: attachments[0].petId.toString(),
      },
    };
  }
}
