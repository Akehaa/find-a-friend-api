import { UseCaseError } from '@/core/errors/use-case-error';

export class OrgAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Org "${identifier}" already exists.`);
  }
}
