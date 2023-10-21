import { AggregateRoot } from '@/core/entities/aggregate-root';
import { PetAttachmentList } from './pet-attachment-list';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface PetProps {
  orgId: UniqueEntityId;
  orgCity: string;
  name: string;
  about: string;
  age: number;
  weight: number;
  breed: string;
  size: string;
  attachments: PetAttachmentList;
}

export class Pet extends AggregateRoot<PetProps> {
  get orgId() {
    return this.props.orgId;
  }

  get orgCity() {
    return this.props.orgCity;
  }

  get name() {
    return this.props.name;
  }

  get about() {
    return this.props.about;
  }

  get age() {
    return this.props.age;
  }

  get weight() {
    return this.props.weight;
  }

  get breed() {
    return this.props.breed;
  }

  get size() {
    return this.props.size;
  }

  get attachments() {
    return this.props.attachments;
  }

  set about(about: string) {
    this.props.about = about;
  }

  set attachments(attachments: PetAttachmentList) {
    this.props.attachments = attachments;
  }

  static create(props: Optional<PetProps, 'attachments'>, id?: UniqueEntityId) {
    const pet = new Pet(
      {
        ...props,
        attachments: props.attachments ?? new PetAttachmentList(),
      },
      id,
    );

    return pet;
  }
}
