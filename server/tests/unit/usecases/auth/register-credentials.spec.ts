import { describe, it, expect, vi, beforeAll } from "vitest";
import { RegisterCredentialsUsecase, type RegisterCredentialsUsecaseInput } from "@usecases/auth/register-credentials.ts";
import { fakeAuthRepository } from "tests/mocks/repositories/fake-auth-repository.ts";
import { fakePasswordHasher } from "tests/mocks/services/fake-password-hasher.ts";
import { fakeIdGenerator } from "tests/mocks/services/fake-id-generator.ts";

describe("Usecase: Auth > Register-credentials", () => {
  const data: RegisterCredentialsUsecaseInput = {
    id: "91283asio",
    name: "ablubluble",
    email: "aaa@domain.com",
    password: "somethingHashed",
    company: "1000x",
    domain: "@aaa"
  }

  let registerCredentialsUsecase: RegisterCredentialsUsecase;

  beforeAll(() => {
    registerCredentialsUsecase = RegisterCredentialsUsecase.create(fakeAuthRepository, fakePasswordHasher);
  });

  it("should instantiate the usecase successfully", () => {
    expect(registerCredentialsUsecase).toBeInstanceOf(RegisterCredentialsUsecase);
  });

  it("should execute the usecase successfully", async () => {
    await expect(registerCredentialsUsecase.execute(data)).resolves.toBeDefined();
  });

  it("shouldn't execute the usecase successfully", async () => {
    const { domain, ...props } = data;
    await expect(registerCredentialsUsecase.execute(props as unknown as RegisterCredentialsUsecaseInput)).rejects.toThrow();
  });
});