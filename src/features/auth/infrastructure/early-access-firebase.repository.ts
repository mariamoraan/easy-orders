import { doc, setDoc } from 'firebase/firestore';
import { EarlyAccessRepository } from '../domain/early-access.repository';
import { db } from '@/core/firebase';

export class EarlyAccessFirebaseRepository implements EarlyAccessRepository {
  async post(email: string): Promise<void> {
    const docRef = doc(db, 'early-access', email);
    await setDoc(docRef, { email });
  }
}
