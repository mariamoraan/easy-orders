import { AuthError } from '@/core/errors/auth.error';
import { Credentials } from './credentials';
import { User } from './user';

export interface AuthRepository {
  login: (credentials: Credentials) => Promise<User | AuthError>;
  signup: (credentials: Credentials) => Promise<User | AuthError>;
  logout: () => Promise<void>;
  authStateSubscriber: (onChange: (user: User | undefined) => void) => void;
  updateUserData: (uid: string, newInfo: Partial<User>) => Promise<User>;
  findUserById: (uid: string) => Promise<User>;
}
