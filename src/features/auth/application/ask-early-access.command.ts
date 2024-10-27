import { EarlyAccessRepository } from '../domain/early-access.repository';

export class AskEarlyAccessCommand {
  constructor(private readonly earlyAccessRepository: EarlyAccessRepository) {}

  handle(email: string) {
    return this.earlyAccessRepository.post(email);
  }
}
