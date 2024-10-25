import { AuthRepository } from '../domain/auth.repository';
import { Credentials } from '../domain/credentials';

export class LoginCommand {
  constructor(private readonly authRepository: AuthRepository) {}

  handle(credentials: Credentials) {
    return this.authRepository.login(credentials);
  }
}
