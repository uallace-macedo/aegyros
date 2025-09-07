import { describe, it, beforeAll, expect } from "vitest";
import { CreateEmployeeAcessUsecase, type CreateEmployeeAcessUsecaseInput } from "@usecases/auth/create-employee-access.ts";
import { fakeAuthRepository } from "tests/mocks/repositories/fake-auth-repository.ts";
import { fakePasswordHasher } from "tests/mocks/services/fake-password-hasher.ts";
import { fakeUserRepository } from "tests/mocks/repositories/fake-user-repository.ts";
import { fakeIdGenerator } from "tests/mocks/services/fake-id-generator.ts";
import { UserRoleEnum } from "@entities/user/user.role-enum.ts";
import { rolePermissions } from "@constants/role-permissions.constant.ts";

describe("Usecase > Create-employee-access", () => {
  const data: CreateEmployeeAcessUsecaseInput = {
    name: "john",
    email: "john@email.com",
    company: "000x1",
    domain: "@aegyros",
    password: "abcdef"
  };

  let cea: CreateEmployeeAcessUsecase;

  beforeAll(() => {
    cea = CreateEmployeeAcessUsecase.create(fakeAuthRepository, fakeUserRepository, fakeIdGenerator, fakePasswordHasher)
  });

  it("should instantiate the usecase successfully", () => {
    expect(cea).toBeInstanceOf(CreateEmployeeAcessUsecase);
  });

  it("should execute the usecase successfully", async () => {
    await expect(cea.execute(data)).resolves.not.toThrow();
  });

  it("should create an employee, and have role & permissions employee-based", async () => {
    const user = await cea.execute(data);
    expect(user.role).toEqual(UserRoleEnum.EMPLOYEE);
    expect(JSON.stringify(user.permissions)).toEqual(JSON.stringify(rolePermissions.EMPLOYEE));
  });

  it("shouldn't execute the usecase successfully", async () => {
    const { domain, ...props } = data;
    await expect(cea.execute(props as unknown as CreateEmployeeAcessUsecaseInput)).rejects.toThrow();
  });
})