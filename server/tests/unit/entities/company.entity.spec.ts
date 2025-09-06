import { it, expect, describe, beforeAll, expectTypeOf } from "vitest";
import { Company } from "@entities/company/company.entity.ts";

describe("Entity: Company", () => {
  const data = {
    id: "0001",
    name: "Company X",
    domain: "@companyx.com",
    managers: ["MG001", "MG002"],
    employees: ["EMP001", "EMP002"],
    branches: ["B001", "B002"]
  };

  let company: Company;

  beforeAll(() => {
    company = Company.create(data);
  });

  it("should be possible to create a Company with all fields", () => {
    expect(company).toBeInstanceOf(Company);
  });

  it("should be possible to create a Company with {id, name, manager_id} fields", () => {
    const { id, name, ...props } = data;
    const company_data = { id, name, managers: ["00015ab"] };

    expect(Company.create(company_data)).toBeInstanceOf(Company);
    expect(() => Company.create(company_data)).not.toThrow();
  });

  it("should be possible to get all company data", () => {
    expectTypeOf(company.getBranches()).toEqualTypeOf<string[]>();
    expectTypeOf(company.getDomain()).toEqualTypeOf<string>();
    expectTypeOf(company.getEmployees()).toEqualTypeOf<string[]>();
    expectTypeOf(company.getManagers()).toEqualTypeOf<string[]>();
  });
});