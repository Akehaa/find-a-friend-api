import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { OrgsRepository } from '@/domain/main/application/repositories/orgs-repository';
import { PrismaOrgsRepository } from './prisma/repositories/prisma-orgs-repository';
import { PetsRepository } from '@/domain/main/application/repositories/pets-repository';
import { PrismaPetsRepository } from './prisma/repositories/prisma-pets-repository';
import { PetAttachmentsRepository } from '@/domain/main/application/repositories/pet-attachments-repository';
import { PrismaPetAttachmentsRepository } from './prisma/repositories/prisma-pet-attachments-repository';
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
  ],
  exports: [
    PrismaService,
    OrgsRepository,
    PetsRepository,
    PetAttachmentsRepository,
  ],
})
export class DatabaseModule {}
