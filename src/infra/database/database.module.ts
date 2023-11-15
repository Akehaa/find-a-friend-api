import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { OrgsRepository } from '@/domain/main/application/repositories/orgs-repository';
import { PrismaOrgsRepository } from './prisma/repositories/prisma-orgs-repository';
import { PetsRepository } from '@/domain/main/application/repositories/pets-repository';
import { PrismaPetsRepository } from './prisma/repositories/prisma-pets-repository';
import { PetAttachmentsRepository } from '@/domain/main/application/repositories/pet-attachments-repository';
import { PrismaPetAttachmentsRepository } from './prisma/repositories/prisma-pet-attachments-repository';
import { AttachmentsRepository } from '@/domain/main/application/repositories/attachments-repository';
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachments-repository';
@Module({
  providers: [
    PrismaService,
    {
      provide: OrgsRepository,
      useClass: PrismaOrgsRepository,
    },
    {
      provide: PetsRepository,
      useClass: PrismaPetsRepository,
    },
    {
      provide: PetAttachmentsRepository,
      useClass: PrismaPetAttachmentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    OrgsRepository,
    PetsRepository,
    PetAttachmentsRepository,
    AttachmentsRepository,
  ],
})
export class DatabaseModule {}
