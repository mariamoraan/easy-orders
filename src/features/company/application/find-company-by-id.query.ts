import { CompanyRepository } from '../domain/company.repository';

export class FindCompanyByIdQuery {
  constructor(private readonly companyRepository: CompanyRepository) {}
  handle(id: string) {
    return this.companyRepository.findById(id);
  }
}
