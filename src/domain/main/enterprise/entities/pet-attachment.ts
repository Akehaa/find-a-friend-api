import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface PetAttachmentProps {
  petId: UniqueEntityId;
  attachmentId: UniqueEntityId;
}

export class PetAttachment extends Entity<PetAttachmentProps> {
  get petId() {
    return this.props.petId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: PetAttachmentProps, id?: UniqueEntityId) {
    const petAttachment = new PetAttachment(props, id);

    return petAttachment;
  }
}
