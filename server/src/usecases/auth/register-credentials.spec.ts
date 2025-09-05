import { describe, it, expect, vi, beforeAll } from "vitest";
import { RegisterCredentialsUsecase, type RegisterCredentialsUsecaseInput } from "./register-credentials.ts";
import type { IAuthRepository } from "../../entities/auth/auth.repository.ts";
import type { IPasswordHasher } from "../../shared/contracts/password-hasher.contract.ts";

describe("Usecase: Auth > Register-credentials", () => {
  const mockAuthRepo: IAuthRepository = {
    save: vi.fn()
  };

  const mockPasswordHasher: IPasswordHasher = {
    hash: vi.fn().mockResolvedValue("hashed_password"),
    compare: vi.fn()
  };

  const data: RegisterCredentialsUsecaseInput = {
    email: "aaa@domain.com",
    password: "somethingHashed",
    company: "1000x",
    domain: "@aaa"
  }

  let registerCredentialsUsecase: RegisterCredentialsUsecase;

  beforeAll(() => {
    registerCredentialsUsecase = RegisterCredentialsUsecase.create(mockAuthRepo, mockPasswordHasher);
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