import { FakeHasher } from 'test/cryptography/fake-hasher';
import { InMemoryOrgsRepository } from 'test/repositories/in-memory-orgs-repository';
import { RegisterOrgUseCase } from './register-org';

let inMemoryOrgsRepository: InMemoryOrgsRepository;
let fakeHasher: FakeHasher;

let sut: RegisterOrgUseCase;

describe('Register Org', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository();
    fakeHasher = new FakeHasher();

    sut = new RegisterOrgUseCase(inMemoryOrgsRepository, fakeHasher);
  });

  it('should be able to register a new org', async () => {
    const result = await sut.execute({
      nameOfPersonResponsible: 'John Doe',
      email: 'Johndoe@example.com',
      city: 'test city',
      cep: '123',
      address: 'test street',
      whatsapp: '1234',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      org: inMemoryOrgsRepository.items[0],
    });
  });

  it('Should hash org password upon registration', async () => {
    const result = await sut.execute({
      nameOfPersonResponsible: 'John Doe',
      email: 'Johndoe@example.com',
      city: 'test city',
      cep: '123',
      address: 'test street',
      whatsapp: '1234',
      password: '123456',
    });

    const hashedPassword = await fakeHasher.hash('123456');

    expect(result.isRight()).toBe(true);
    expect(inMemoryOrgsRepository.items[0].password).toEqual(hashedPassword);
  });
});
