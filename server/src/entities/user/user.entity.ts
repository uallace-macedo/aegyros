type UserProps = {
  id: string;
  name: string;
  company: string;
  role: string;
  permissions: string[];
};

export class User {
  private constructor(private props: UserProps) { };
  public static create(props: UserProps): User {
    return new User(props);
  };

  public getPermissions(): string[] {
    return this.props.permissions;
  }
}