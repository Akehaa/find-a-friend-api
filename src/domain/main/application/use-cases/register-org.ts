import { Either, left, right } from '@/core/either';
import { OrgAlreadyExistsError } from './errors/org-already-exists-error';
import { Org } from '../../enterprise/entities/org';
import { OrgsRepository } from '../repositories/orgs-repository';
import { HashGenerator } from '../cryptography/hash-generator';
import { Injectable } from '@nestjs/common';

interface RegisterOrgUseCaseRequest {
  nameOfPersonResponsible: string;
  email: string;
  cep: string;
  address: string;
  whatsapp: string;
  password: string;
}

type RegisterOrgUseCaseResponse = Either<
  OrgAlreadyExistsError,
  {
    org: Org;
  }
>;
@Injectable()
export class RegisterOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    nameOfPersonResponsible,
    email,
    cep,
    address,
    whatsapp,
    password,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      return left(new OrgAlreadyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const org = Org.create({
      nameOfPersonResponsible,
      email,
      cep,
      address,
      whatsapp,
      password: hashedPassword,
    });

    await this.orgsRepository.create(org);

    return right({
      org,
    });
  }
}
