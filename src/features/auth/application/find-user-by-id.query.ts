import { AuthRepository } from '../domain/auth.repository';

export class FindUserByIdQuery {
  constructor(private readonly authRepository: AuthRepository) {}

  handle(uid: string) {
    return this.authRepository.findUserById(uid);
  }
}
