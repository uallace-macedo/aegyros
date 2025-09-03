import type { Company } from "./company.entity.ts";

export interface ICompanyRepository {
  save(company: Company): Promise<void>;
}