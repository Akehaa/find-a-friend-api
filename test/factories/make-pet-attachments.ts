import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  PetAttachment,
  PetAttachmentProps,
} from '@/domain/main/enterprise/entities/pet-attachment';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export function makePetAttachment(
  override: Partial<PetAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const petAttachment = PetAttachment.create(
    {
      petId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  );

  return petAttachment;
}

@Injectable()
export class PetAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPetAttachment(
    data: Partial<PetAttachmentProps> = {},
  ): Promise<PetAttachment> {
    const petAttachment = makePetAttachment(data);

    await this.prisma.attachment.update({
      where: {
        id: petAttachment.attachmentId.toString(),
      },
      data: {
        petId: petAttachment.petId.toString(),
      },
    });

    return petAttachment;
  }
}
