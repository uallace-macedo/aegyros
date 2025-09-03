import { UserRoleEnum } from "./user.role-enum.ts";

export type UserProps = {
  id: string;
  name: string;
  company: string | null;
  role: UserRoleEnum;
  permissions: string[];
};

export class User {
  private constructor(private props: UserProps) { };
  public static create(props: Omit<UserProps, "company">): User {
    return new User({
      ...props,
      company: null
    });
  };

  public static with(props: UserProps): User {
    if (!props.company) throw new Error("'company' must exist!");
    return new User(props);
  };

  public getPermissions(): string[] {
    return this.props.permissions;
  }

  public get role() { return this.props.role };
  public get company() { return this.props.company };
}