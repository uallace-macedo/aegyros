import { describe, it, beforeAll, expect, expectTypeOf } from "vitest";
import { EmployeeRegisterUsecase, type EmployeeRegisterUsecaseInput } from "@usecases/auth/employee-register-credentials.ts";
import { fakeAuthRepository } from "tests/mocks/repositories/fake-auth-repository.ts";
import { fakePasswordHasher } from "tests/mocks/services/fake-password-hasher.ts";
import { fakeUserRepository } from "tests/mocks/repositories/fake-user-repository.ts";
import { fakeIdGenerator } from "tests/mocks/services/fake-id-generator.ts";
import { UserRoleEnum } from "@entities/user/user.role-enum.ts";
import { rolePermissions } from "@constants/role-permissions.constant.ts";

describe("Usecase > Create-employee-access", () => {
  const data: EmployeeRegisterUsecaseInput = {
    name: "john",
    email: "john@email.com",
    company: "000x1",
    domain: "@aegyros",
    password: "abcdef"
  };

  let cea: EmployeeRegisterUsecase;

  beforeAll(() => {
    cea = EmployeeRegisterUsecase.create(fakeAuthRepository, fakeUserRepository, fakeIdGenerator, fakePasswordHasher)
  });

  it("should instantiate the usecase successfully", () => {
    expect(cea).toBeInstanceOf(EmployeeRegisterUsecase);
  });

  it("should execute the usecase successfully", async () => {
    await expect(cea.execute(data)).resolves.not.toThrow();
  });

  it("should create an employee, and have role & permissions employee-based", async () => {
    const user = await cea.execute(data);
    expectTypeOf(user.id).toEqualTypeOf<string>();
    expect(user.role).toEqual(UserRoleEnum.EMPLOYEE);
    expect(JSON.stringify(user.permissions)).toEqual(JSON.stringify(rolePermissions.EMPLOYEE));
  });

  it("shouldn't execute the usecase successfully", async () => {
    const { domain, ...props } = data;
    await expect(cea.execute(props as unknown as EmployeeRegisterUsecaseInput)).rejects.toThrow();
  });
})