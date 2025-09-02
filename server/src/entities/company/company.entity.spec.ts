import { it, expect, describe, beforeAll, expectTypeOf } from "vitest";
import { Company } from "./company.entity.ts";

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

  it("should be possible to create a Company", () => {
    expect(company).toBeInstanceOf(Company);
  });

  it("should be possible to get all company data", () => {
    expectTypeOf(company.getBranches()).toEqualTypeOf<string[]>();
    expectTypeOf(company.getDomain()).toEqualTypeOf<string>();
    expectTypeOf(company.getEmployees()).toEqualTypeOf<string[]>();
    expectTypeOf(company.getManagers()).toEqualTypeOf<string[]>();
  });
});