import { describe, expect, it, vi } from "vitest";
import type { IdGeneratorContract } from "../../shared/contracts/id-generator.contract.ts";
import type { ICompanyRepository } from "../../entities/company/company.repository.ts";
import { CompanyRegisterCompanyUsecase } from "./company.register-company.usecase.ts";
import { Company } from "../../entities/company/company.entity.ts";

describe("Usecase: Company-register", () => {
  const defaultData = { name: "Aegyros", manager_id: "0000x" };

  const mockIdGenerator: IdGeneratorContract = {
    generate: () => "mock-id-123"
  };

  const companyRepository: ICompanyRepository = {
    save: vi.fn()
  };

  const usecase = CompanyRegisterCompanyUsecase.create(companyRepository, mockIdGenerator);

  it("should execute the usecase successfully", async () => {
    const result = await usecase.execute(defaultData);

    expect(result).toBeInstanceOf(Company);
    expect(result.getBranches()).toEqual([]);
    expect(result.getDomain()).toEqual(`@aegyros`);
    expect(result.getEmployees()).toEqual([]);
  });

  it("should use only acceptable fields {name, manager}", async () => {
    const fullData = {
      ...defaultData,
      domain: "@args",
      branches: ["abc", "def"],
      employees: ["cefg", "hij"]
    };

    const result = await usecase.execute(fullData);
    expect(result.getDomain()).not.toEqual("@args");
    expect(result.getBranches()).not.toEqual(["abc", "def"]);
    expect(result.getEmployees()).not.toEqual(["cefg", "hij"]);
  });
});