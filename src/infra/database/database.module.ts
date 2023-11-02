import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { OrgsRepository } from '@/domain/main/application/repositories/orgs-repository';
import { PrismaOrgsRepository } from './prisma/repositories/prisma-orgs-repository';
@Module({
  providers: [
    PrismaService,
    {
      provide: OrgsRepository,
      useClass: PrismaOrgsRepository,
    },
  ],
  exports: [PrismaService, OrgsRepository],
})
export class DatabaseModule {}
