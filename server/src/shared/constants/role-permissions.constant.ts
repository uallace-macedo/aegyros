import { UserRoleEnum } from "../../entities/user/user.role-enum.ts";

const actions = ["read", "create", "update", "delete"];
const entities = ["user", "company", "equipment"];

/**
 * @example
 * const permission = {
 *   "create": {
 *      "user": "create:user",
 *      "company": "create:company"
 *   },
 *   "delete": {
 *     "user": "delete:user",
 *     "company": "delete:company"
 *   }
 * }
*/

const permissions = Object.fromEntries(
  actions.map(
    action => [
      action,
      Object.fromEntries(
        entities.map(entity => [entity, `${action}:${entity}`])
      )
    ]
  )
);

const setPermissions = (entity: string, actions: string[]): string[] => {
  return actions.map(action => permissions[action][entity]);
};

const managerPermissions = [
  ...setPermissions("user", actions),
  ...setPermissions("company", actions),
  ...setPermissions("equipment", actions),
];

const employeePermissions = [
  ...setPermissions("company", ["read"]),
  ...setPermissions("equipment", actions),
]

export const rolePermissions: Record<UserRoleEnum, string[]> = {
  MANAGER: managerPermissions,
  EMPLOYEE: employeePermissions,
};