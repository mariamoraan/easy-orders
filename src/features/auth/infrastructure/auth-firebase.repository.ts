import { AuthRepository } from '../domain/auth.repository';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged as onAuthStateChangedFirebase,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { Credentials } from '../domain/credentials';
import { AuthError } from '@/core/errors/auth.error';
import { User } from '../domain/user';
import { db } from '@/core/firebase';

export class AuthFirebaseRepository implements AuthRepository {
  private readonly auth = getAuth();
  public async findUserById(uid: string): Promise<User> {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const user: User = { ...docSnap.data(), uid };
      return user;
    }
    throw Error;
  }
  public async createUser(user: User): Promise<User> {
    const docRef = doc(db, 'users', user.uid);
    await setDoc(docRef, user);
    return user;
  }
  public async login({ email, password }: Credentials): Promise<User | AuthError> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = await this.findUserById(userCredential.user.uid);
      return user;
    } catch (e: unknown) {
      const error = e as { code?: number; message?: string };
      const errorCode = error?.code || 201;
      const errorMessage = error?.message || 'Unkown error';
      return new AuthError(errorCode, errorMessage);
    }
  }
  public async logout() {
    await signOut(this.auth);
  }

  public async signup({ email, password }: Credentials): Promise<User | AuthError> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await this.createUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email || undefined,
      });
      const user = await this.findUserById(userCredential.user.uid);
      return user;
    } catch (e: unknown) {
      const error = e as { code?: number; message?: string };
      const errorCode = error?.code || 201;
      const errorMessage = error?.message || 'Unkown error';
      return new AuthError(errorCode, errorMessage);
    }
  }

  public async authStateSubscriber(onChange: (user: User | undefined) => void) {
    onAuthStateChangedFirebase(this.auth, async (auth) => {
      if (auth) {
        const { uid } = auth;
        const user = await this.findUserById(uid);
        if (user) {
          onChange(user);
          return;
        }
        onChange(undefined);
      } else {
        onChange(undefined);
      }
    });
  }

  public async updateUserData(uid: string, newInfo: Partial<User>): Promise<User> {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, newInfo);
    const updatedUser = await this.findUserById(uid);
    return updatedUser;
  }
}
