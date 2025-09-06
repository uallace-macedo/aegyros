import type { Company } from "@entities/company/company.entity.ts";
import { type ICompanyRepository } from "@entities/company/company.repository.ts";

class FakeCompanyRepository implements ICompanyRepository {
  save(company: Company): Promise<void> {
    return new Promise((res, rej) => {
      res();
    })
  }
}

export const fakeCompanyRepository = new FakeCompanyRepository();