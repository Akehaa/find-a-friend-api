import { AttachmentsRepository } from '@/domain/main/application/repositories/attachments-repository';
import { Attachment } from '@/domain/main/enterprise/entities/attachment';

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = [];

  async create(attachment: Attachment) {
    this.items.push(attachment);
  }
}
