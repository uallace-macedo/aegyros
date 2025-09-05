import { it, describe, vi, expect } from "vitest";
import type { IdGeneratorContract } from "../../../shared/contracts/id-generator.contract.ts";
import type { IUserRepository } from "../../../entities/user/user.repository.ts";
import { ManagerCreateAccountUsecase } from "./create-account.usecase.ts";
import { User } from "../../../entities/user/user.entity.ts";
import { UserRoleEnum } from "../../../entities/user/user.role-enum.ts";

describe("Usecase: Manager > Create-account", () => {
  const rolePermissions: Record<UserRoleEnum, string[]> = {
    MANAGER: ["create:user"],
    EMPLOYEE: []
  }

  const mockIdGenerator: IdGeneratorContract = {
    generate: () => "mocked-id-123"
  };

  const mockUserRepository: IUserRepository = {
    save: vi.fn()
  };

  const usecase = ManagerCreateAccountUsecase.create(
    mockUserRepository,
    mockIdGenerator,
    rolePermissions
  );

  it("should execute the usecase successfully", async () => {
    const input = { name: "John" };
    const result = await usecase.execute(input);

    expect(result).toBeInstanceOf(User);
    expect(result.role).toEqual(UserRoleEnum.MANAGER);
    expect(result.company).toEqual(null);
    expect(result.getPermissions()).toEqual(rolePermissions.MANAGER);
  });
});