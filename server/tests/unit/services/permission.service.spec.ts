import { beforeAll, describe, expect, it } from "vitest";
import { PermissionService } from "@services/permission.service.ts";
import type { UserRoleEnum } from "@entities/user/user.role-enum.ts";

describe("Service > PermissionService", () => {
  let permissionService: PermissionService;
  const rolePermissions: Record<UserRoleEnum, string[]> = {
    MANAGER: ["read:user"],
    EMPLOYEE: ["create:equipment"]
  }

  beforeAll(() => {
    permissionService = PermissionService.create(rolePermissions);
  })

  it("should be possible to instantiate a PermissionService", () => {
    expect(permissionService).toBeInstanceOf(PermissionService);
  });

  it("should be possible to use can() method, and check a possible action", () => {
    const canReadUser = permissionService.can("MANAGER", "read:user");
    expect(canReadUser).toBeTruthy();
  });

  it("should be possible to use can() method, and check a non-possible action", () => {
    const canReadUser = permissionService.can("EMPLOYEE", "read:user");
    expect(canReadUser).toBeFalsy();
  });
});