import { OrgsRepository } from '@/domain/main/application/repositories/orgs-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Org } from '@/domain/main/enterprise/entities/org';
import { PrismaOrgMapper } from '../mappers/prisma-org-mapper';

@Injectable()
export class PrismaOrgsRepository implements OrgsRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Org | null> {
    const org = await this.prisma.org.findUnique({
      where: {
        email,
      },
    });

    if (!org) {
      return null;
    }

    return PrismaOrgMapper.toDomain(org);
  }

  async create(org: Org): Promise<void> {
    const data = PrismaOrgMapper.toPrisma(org);

    await this.prisma.org.create({
      data,
    });
  }
}
