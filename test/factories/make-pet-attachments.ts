import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  PetAttachment,
  PetAttachmentProps,
} from '@/domain/main/enterprise/entities/pet-attachment';

export function makePetAttachment(
  override: Partial<PetAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const petAttachment = PetAttachment.create(
    {
      petId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  );

  return petAttachment;
}
