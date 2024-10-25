import { CompanyRepository } from '../domain/company.repository';
import { Company } from '../domain/company';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/core/firebase';

export class CompanyFirebaseRepository implements CompanyRepository {
  public async findById(id: string): Promise<Company> {
    try {
      const companyRef = doc(db, 'companies', id);
      const companySnap = await getDoc(companyRef);
      if (companySnap.exists()) {
        const companyData = companySnap.data();
        const company: Company = {
          id: companyData.id,
          name: companyData.name,
          ownerId: companyData.ownerId,
        };
        return company;
      } else {
        throw Error('Company does not exists');
      }
    } catch (error) {
      console.error(error);
      throw Error('Company does not exists');
    }
  }
  public async create(company: Company): Promise<void> {
    const docRef = doc(db, 'companies', company.id);
    await setDoc(docRef, company);
  }
}
