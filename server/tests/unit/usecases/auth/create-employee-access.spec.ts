import { describe, it, beforeAll, expect } from "vitest";
import { CreateEmployeeAcessUsecase } from "@usecases/auth/create-employee-access.ts";
import { fakeAuthRepository } from "tests/mocks/repositories/fake-auth-repository.ts";
import { fakeRandomPasswordGenerator } from "tests/mocks/services/fake-random-password-generator.ts";

describe("Usecase > Create-employee-access", () => {
  let cea: CreateEmployeeAcessUsecase;

  beforeAll(() => {
    cea = CreateEmployeeAcessUsecase.create(fakeAuthRepository, fakeRandomPasswordGenerator)
  });

  it("should instantiate the usecase successfully", () => {
    expect(cea).toBeInstanceOf(CreateEmployeeAcessUsecase);
  });

  it("should execute the usecase successfully")
  it("shouldn't execute the usecase successfully")
})