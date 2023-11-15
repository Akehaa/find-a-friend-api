import { PetsRepository } from '@/domain/main/application/repositories/pets-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Pet } from '@/domain/main/enterprise/entities/pet';
import { PrismaPetMapper } from '../mappers/prisma-pet-mapper';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { PetAttachmentsRepository } from '@/domain/main/application/repositories/pet-attachments-repository';

@Injectable()
export class PrismaPetsRepository implements PetsRepository {
  constructor(
    private prisma: PrismaService,
    private petAttachmentsRepository: PetAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Pet | null> {
    const pet = await this.prisma.pet.findUnique({
      where: {
        id,
      },
    });

    if (!pet) {
      null;
    }

    return PrismaPetMapper.toDomain(pet);
  }

  async findManyByOrgId(
    orgId: string,
    { page }: PaginationParams,
  ): Promise<Pet[]> {
    const pets = await this.prisma.pet.findMany({
      where: {
        orgId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return pets.map(PrismaPetMapper.toDomain);
  }

  async findManyByCity(
    city: string,
    { page }: PaginationParams,
  ): Promise<Pet[]> {
    const pets = await this.prisma.pet.findMany({
      where: {
        city,
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return pets.map(PrismaPetMapper.toDomain);
  }

  async findManyByName(
    { page }: PaginationParams,
    name?: string,
  ): Promise<Pet[]> {
    const pets = await this.prisma.pet.findMany({
      where: {
        name,
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return pets.map(PrismaPetMapper.toDomain);
  }

  async findManyByAge(
    { page }: PaginationParams,
    age?: string,
  ): Promise<Pet[]> {
    const pets = await this.prisma.pet.findMany({
      where: {
        age,
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return pets.map(PrismaPetMapper.toDomain);
  }

  async findManyByWeight(
    { page }: PaginationParams,
    weight?: string,
  ): Promise<Pet[]> {
    const pets = await this.prisma.pet.findMany({
      where: {
        weight,
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return pets.map(PrismaPetMapper.toDomain);
  }

  async findManyByBreed(
    { page }: PaginationParams,
    breed?: string,
  ): Promise<Pet[]> {
    const pets = await this.prisma.pet.findMany({
      where: {
        breed,
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return pets.map(PrismaPetMapper.toDomain);
  }

  async findManyBySize(
    { page }: PaginationParams,
    size?: string,
  ): Promise<Pet[]> {
    const pets = await this.prisma.pet.findMany({
      where: {
        size,
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return pets.map(PrismaPetMapper.toDomain);
  }

  async create(pet: Pet): Promise<void> {
    const data = PrismaPetMapper.toPrisma(pet);

    await this.prisma.pet.create({
      data,
    });

    await this.petAttachmentsRepository.createMany(pet.attachments.getItems());
  }

  async save(pet: Pet): Promise<void> {
    const data = PrismaPetMapper.toPrisma(pet);

    await Promise.all([
      this.prisma.pet.update({
        where: {
          id: pet.id.toString(),
        },
        data,
      }),
      this.petAttachmentsRepository.createMany(pet.attachments.getNewItems()),
      this.petAttachmentsRepository.deleteMany(
        pet.attachments.getRemovedItems(),
      ),
    ]);
  }

  async delete(pet: Pet): Promise<void> {
    const data = PrismaPetMapper.toPrisma(pet);

    await this.prisma.pet.delete({
      where: {
        id: data.id,
      },
    });
  }
}
