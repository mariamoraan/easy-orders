import { CreateCompanyCommand } from '../application/create-company.command';
import { FindCompanyByIdQuery } from '../application/find-company-by-id.query';
import { CompanyRepository } from '../domain/company.repository';
import { CompanyFirebaseRepository } from '../infrastructure/company-firebase.repository';

export class CompanyLocator {
  static getRepository(): CompanyRepository {
    return new CompanyFirebaseRepository();
  }
  static getCreateCompanyCommand() {
    return new CreateCompanyCommand(this.getRepository());
  }
  static getFindCompanyByIdQuery() {
    return new FindCompanyByIdQuery(this.getRepository());
  }
}
