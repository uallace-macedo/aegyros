import { describe, expect, it, vi } from "vitest";
import { CompanyRegisterCompanyUsecase } from "@usecases/company/register-by-manager.usecase.ts";
import { Company } from "@entities/company/company.entity.ts";
import { fakeCompanyRepository } from "tests/mocks/repositories/fake-company-repository.ts";
import { fakeIdGenerator } from "tests/mocks/services/fake-id-generator.ts";

describe("Usecase: Company-register", () => {
  const defaultData = { name: "Aegyros", manager_id: "0000x" };

  const usecase = CompanyRegisterCompanyUsecase.create(fakeCompanyRepository, fakeIdGenerator);

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