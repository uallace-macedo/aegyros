import { it, describe, expect } from "vitest";
import { ManagerCreateAccountUsecase } from "@usecases/user/manager/create-account.usecase.ts";
import { User } from "@entities/user/user.entity.ts";
import { UserRoleEnum } from "@entities/user/user.role-enum.ts";
import { fakeUserRepository } from "tests/mocks/repositories/fake-user-repository.ts";
import { fakeIdGenerator } from "tests/mocks/services/fake-id-generator.ts";

describe("Usecase: Manager > Create-account", () => {
  const rolePermissions: Record<UserRoleEnum, string[]> = {
    MANAGER: ["create:user"],
    EMPLOYEE: []
  };

  const usecase = ManagerCreateAccountUsecase.create(
    fakeUserRepository,
    fakeIdGenerator,
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