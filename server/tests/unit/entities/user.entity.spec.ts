import { describe, it, expectTypeOf, expect } from "vitest";
import { User, type UserProps } from "@entities/user/user.entity.ts";

describe("Entity: User", () => {
  const userData: UserProps = {
    id: "0001",
    name: "manager01",
    company: "C0001",
    role: "MANAGER",
    permissions: ["create:users", "read:users", "update:users", "delete:users"]
  };

  it("should be possible to create a manager and employee", () => {
    const { role, ...props } = userData;
    const manager = User.create({ ...props, role: "MANAGER" });
    const employee = User.create({ ...props, role: "EMPLOYEE" });

    expectTypeOf(manager).toEqualTypeOf<User>();
    expectTypeOf(employee).toEqualTypeOf<User>();
  });

  it("should be possible to retrieve user information", () => {
    const user = User.with(userData);
    expectTypeOf(user.getPermissions()).toEqualTypeOf<string[]>();
  });

  it("should be possible to create a user without company field", () => {
    const { company, ...props } = userData;
    expect(() => {
      User.create(props as unknown as UserProps);
    }).not.toThrow();
  });

  it("should be possible to instantiate a user with 'with' method", () => {
    expect(() => {
      User.with(userData);
    }).not.toThrow();
  });

  it("shouldnt be possible to instantiate a user without 'company' using 'with' method", () => {
    const { company, ...props } = userData;
    expect(() => {
      User.with(props as unknown as UserProps);
    }).toThrow("'company' must exist!");
  });
});