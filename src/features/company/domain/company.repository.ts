import { Company } from './company';

export interface CompanyRepository {
  create: (company: Company) => Promise<void>;
  findById: (id: string) => Promise<Company>;
}
