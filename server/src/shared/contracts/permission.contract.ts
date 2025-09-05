import type { UserRoleEnum } from "../../entities/user/user.role-enum.ts";

export interface IPermissionContract {
  can(role: UserRoleEnum, action: string): boolean;
}