export type UserRoleEnum = "MANAGER" | "EMPLOYEE";

export const UserRoleEnum = {
  MANAGER: "MANAGER" as UserRoleEnum,
  EMPLOYEE: "EMPLOYEE" as UserRoleEnum
} as const;