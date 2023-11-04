import { AggregateRoot } from '@/core/entities/aggregate-root';
import { PetAttachmentList } from './pet-attachment-list';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface PetProps {
  orgId: UniqueEntityId;
  city: string;
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

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get city() {
    return this.props.city;
  }

  set city(city: string) {
    this.props.city = city;
  }

  get about() {
    return this.props.about;
  }

  set about(about: string) {
    this.props.about = about;
  }

  get age() {
    return this.props.age;
  }

  set age(age: number) {
    this.props.age = age;
  }

  get weight() {
    return this.props.weight;
  }

  set weight(weight: number) {
    this.props.weight = weight;
  }

  get breed() {
    return this.props.breed;
  }

  set breed(breed: string) {
    this.props.breed = breed;
  }

  get size() {
    return this.props.size;
  }

  set size(size: string) {
    this.props.size = size;
  }

  get attachments() {
    return this.props.attachments;
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
