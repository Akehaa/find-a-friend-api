import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { InMemoryOrgsRepository } from 'test/repositories/in-memory-orgs-repository';
import { AuthenticateOrgUseCase } from './authenticate-org';
import { makeOrg } from 'test/factories/make-org';
import { WrongCredentialsError } from '../../../../core/errors/errors/wrong-credentials-error';

let inMemoryOrgsRepository: InMemoryOrgsRepository;
let fakeHasher: FakeHasher;
let encrypter: FakeEncrypter;

let sut: AuthenticateOrgUseCase;

describe('Authenticate Org', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    fakeHasher = new FakeHasher();
    encrypter = new FakeEncrypter();

    sut = new AuthenticateOrgUseCase(
      inMemoryOrgsRepository,
      fakeHasher,
      encrypter,
    );
  });

  it('should be able to authenticate an org', async () => {
    const org = makeOrg({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryOrgsRepository.items.push(org);

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    console.log(result.value);

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should not be able to authenticate with wrong email', async () => {
    const org = makeOrg({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryOrgsRepository.items.push(org);

    const result = await sut.execute({
      email: 'NOTjohndoe@example.com',
      password: '123456',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const org = makeOrg({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryOrgsRepository.items.push(org);

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123123',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });
});
