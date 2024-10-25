import { FindUserByIdQuery } from '../../application/find-user-by-id.query';
import { LoginCommand } from '../../application/login.command';
import { LogoutCommand } from '../../application/logout.command';
import { SignupCommand } from '../../application/signup.command';
import { UpdateUserCommand } from '../../application/update-user.command';
import { AuthRepository } from '../../domain/auth.repository';
import { AuthFirebaseRepository } from '../../infrastructure/auth-firebase.repository';

export class AuthLocator {
  static getRepository(): AuthRepository {
    return new AuthFirebaseRepository();
  }
  static getLoginCommand() {
    return new LoginCommand(this.getRepository());
  }
  static getLogoutCommand() {
    return new LogoutCommand(this.getRepository());
  }
  static getSignupCommand() {
    return new SignupCommand(this.getRepository());
  }
  static getUpdateUserCommand() {
    return new UpdateUserCommand(this.getRepository());
  }
  static getFindUserByIdQuery() {
    return new FindUserByIdQuery(this.getRepository());
  }
}
