import { PetAttachmentsRepository } from '@/domain/main/application/repositories/pet-attachments-repository';
import { PetAttachment } from '@/domain/main/enterprise/entities/pet-attachment';
import { Injectable } from '@nestjs/common';
import { PrismaPetAttachmentMapper } from '../mappers/prisma-pet-attachment-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaPetAttachmentsRepository
  implements PetAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByPetId(petId: string): Promise<PetAttachment[]> {
    const petAttachments = await this.prisma.attachment.findMany({
      where: {
        petId,
      },
    });

    return petAttachments.map(PrismaPetAttachmentMapper.toDomain);
  }

  async createMany(attachments: PetAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return;
    }

    const data = PrismaPetAttachmentMapper.toPrismaUpdateMany(attachments);

    await this.prisma.attachment.updateMany(data);
  }

  async deleteMany(attachments: PetAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return;
    }

    const attachmentIds = attachments.map((attachment) => {
      return attachment.id.toString();
    });

    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentIds,
        },
      },
    });
  }

  async deleteManyByPetId(petId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        petId,
      },
    });
  }
}
