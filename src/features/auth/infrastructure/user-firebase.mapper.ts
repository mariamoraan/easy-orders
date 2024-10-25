import { User } from '../domain/user';
import { User as FirebaseUser } from 'firebase/auth';

export class UserFirebaseMapper {
  static toDomain(userDto: FirebaseUser): User {
    return {
      uid: userDto.uid,
      email: userDto.email ?? undefined,
      displayName: userDto.displayName ?? undefined,
      photoUrl: userDto.photoURL ?? undefined,
    };
  }
}
