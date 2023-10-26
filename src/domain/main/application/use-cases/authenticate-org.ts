import { Either, left, right } from '@/core/either';
import { Encrypter } from '../cryptography/encrypter';
import { HashComparer } from '../cryptography/hash-comparer';
import { OrgsRepository } from '../repositories/orgs-repository';
import { WrongCredentialsError } from '../../../../core/errors/errors/wrong-credentials-error';

interface AuthenticateOrgUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateOrgUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

export class AuthenticateOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      org.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: org.id.toString(),
    });

    return right({
      accessToken,
    });
  }
}
