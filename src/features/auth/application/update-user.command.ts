import { AuthRepository } from '../domain/auth.repository';
import { User } from '../domain/user';

export class UpdateUserCommand {
  constructor(private readonly authRepository: AuthRepository) {}

  handle(uid: string, newInfo: Partial<User>) {
    return this.authRepository.updateUserData(uid, newInfo);
  }
}
