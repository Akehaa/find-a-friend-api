import { Entity } from 'src/core/entities/entity';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export interface OrgProps {
  nameOfPersonResponsible: string;
  email: string;
  cep: string;
  address: string;
  whatsapp: string;
  password: string;
}

export class Org extends Entity<OrgProps> {
  get nameOfPersonResponsible() {
    return this.props.nameOfPersonResponsible;
  }

  get email() {
    return this.props.email;
  }

  get cep() {
    return this.props.cep;
  }

  get address() {
    return this.props.address;
  }

  get whatsapp() {
    return this.props.whatsapp;
  }

  get password() {
    return this.props.password;
  }

  static create(props: OrgProps, id?: UniqueEntityId) {
    const org = new Org(props, id);

    return org;
  }
}
