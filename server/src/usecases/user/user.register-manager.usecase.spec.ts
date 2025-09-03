import { it, describe, vi, expect } from "vitest";
import type { IdGeneratorContract } from "../../shared/contracts/id-generator.contract.ts";
import type { IUserRepository } from "../../entities/user/user.repository.ts";
import { UserRegisterManagerUsecase } from "./user.register-manager.usecase.ts";
import { User } from "../../entities/user/user.entity.ts";

describe("Usecase: User-Register-Manager", () => {
  const mockIdGenerator: IdGeneratorContract = {
    generate: () => "mocked-id-123"
  };

  const mockUserRepository: IUserRepository = {
    save: vi.fn()
  };

  const usecase = UserRegisterManagerUsecase.create(
    mockUserRepository,
    mockIdGenerator
  );

  it("should execute the usecase successfully", async () => {
    const input = { name: "John" };
    const result = await usecase.execute(input);

    expect(result).toBeInstanceOf(User);
    expect(result.role).toEqual("MANAGER");
    expect(result.company).toEqual(null);
    expect(result.getPermissions()).toEqual(["all"]);
  });
});