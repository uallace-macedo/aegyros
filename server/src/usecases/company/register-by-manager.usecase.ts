import { Company } from "../../entities/company/company.entity.ts";
import type { ICompanyRepository } from "../../entities/company/company.repository.ts";
import type { IdGeneratorContract } from "../../shared/contracts/id-generator.contract.ts";
import type { UsecaseContract } from "../../shared/contracts/usecase.contract.ts";

export type CompanyRegisterCompanyUsecaseInput = {
  name: string;
  manager_id: string;
}

export type CompanyRegisterCompanyUsecaseOutput = Company;

export class CompanyRegisterCompanyUsecase implements UsecaseContract<CompanyRegisterCompanyUsecaseInput, CompanyRegisterCompanyUsecaseOutput> {
  private constructor(
    private companyRepository: ICompanyRepository,
    private idGenerator: IdGeneratorContract
  ) { };

  public static create(companyRepository: ICompanyRepository, idGenerator: IdGeneratorContract): CompanyRegisterCompanyUsecase {
    return new CompanyRegisterCompanyUsecase(companyRepository, idGenerator)
  };

  async execute({ name, manager_id }: CompanyRegisterCompanyUsecaseInput): Promise<CompanyRegisterCompanyUsecaseOutput> {
    const id = this.idGenerator.generate();
    const data = {
      id,
      name,
      managers: [manager_id]
    };

    const company = Company.create(data);
    await this.companyRepository.save(company);

    return company;
  };
}