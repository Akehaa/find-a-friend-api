import { Org } from '../../enterprise/entities/org';

export abstract class OrgsRepository {
  abstract findByEmail(email: string): Promise<Org | null>;
  abstract create(org: Org): Promise<void>;
}
