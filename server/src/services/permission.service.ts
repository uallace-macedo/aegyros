import type { UserRoleEnum } from "../entities/user/user.role-enum.ts";
import type { IPermissionContract } from "../shared/contracts/permission.contract.ts";

export class PermissionService implements IPermissionContract {
  private roleMapper: Record<UserRoleEnum, string[]>;
  private constructor(roleMapper: Record<UserRoleEnum, string[]>) {
    this.roleMapper = roleMapper;
  };

  public static create(roleMapper: Record<UserRoleEnum, string[]>): PermissionService {
    return new PermissionService(roleMapper);
  };

  can(role: UserRoleEnum, action: string): boolean {
    return this.roleMapper[role].includes(action);
  };
};