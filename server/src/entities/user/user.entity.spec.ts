import { describe, it, beforeAll, expectTypeOf } from "vitest";
import { User } from "./user.entity.ts";

describe("Entity: USER", () => {
  const managerData = {
    id: "0001",
    name: "manager01",
    company: "C0001",
    role: "MANAGER",
    permissions: ["create:users", "read:users", "update:users", "delete:users"]
  };

  const employeeData = {
    id: "0002",
    name: "employee01",
    company: "C0001",
    role: "EMPLOYEE",
    permissions: ["create:customers", "read:customers", "update:customers"]
  };

  let manager: User;
  let employee: User;

  beforeAll(() => {
    manager = User.create(managerData);
    employee = User.create(employeeData);
  });

  it("should be possible to create a manager and employee", () => {
    expectTypeOf(manager).toEqualTypeOf<User>();
    expectTypeOf(employee).toEqualTypeOf<User>();
  });

  it("should be possible to retrieve user information", () => {
    expectTypeOf(manager.getPermissions()).toEqualTypeOf<string[]>();
  });
});