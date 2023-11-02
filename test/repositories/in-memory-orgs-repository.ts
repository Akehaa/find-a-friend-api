import { DomainEvents } from '@/core/events/domain-events';
import { OrgsRepository } from '@/domain/main/application/repositories/orgs-repository';
import { Org } from '@/domain/main/enterprise/entities/org';

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  async create(org: Org) {
    this.items.push(org);

    DomainEvents.dispatchEventsForAggregate(org.id);
  }
}
