import { Company } from '../domain/company';
import { CompanyRepository } from '../domain/company.repository';
export class CreateCompanyCommand {
  constructor(private readonly companyRepository: CompanyRepository) {}
  handle(company: Company) {
    return this.companyRepository.create(company);
  }
}
