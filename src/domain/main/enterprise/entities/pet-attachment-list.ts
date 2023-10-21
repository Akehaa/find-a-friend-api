import { WatchedList } from '@/core/entities/watched-list';
import { PetAttachment } from './pet-attachment';

export class PetAttachmentList extends WatchedList<PetAttachment> {
  compareItems(a: PetAttachment, b: PetAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId);
  }
}
