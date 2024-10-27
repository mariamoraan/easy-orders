import { AskEarlyAccessCommand } from '../../application/ask-early-access.command';
import { EarlyAccessRepository } from '../../domain/early-access.repository';
import { EarlyAccessFirebaseRepository } from '../../infrastructure/early-access-firebase.repository';

export class EarlyAccessLocator {
  static getRepository(): EarlyAccessRepository {
    return new EarlyAccessFirebaseRepository();
  }

  static getAskEarlyAccessCommand() {
    return new AskEarlyAccessCommand(this.getRepository());
  }
}
