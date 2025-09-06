export type AuthProps = {
  name: string;
  email: string;
  password: string;
  company: string;
  domain: string;
}

export class Auth {
  private constructor(private props: AuthProps) { };

  public static create(props: AuthProps): Auth {
    if (!props.name || !props.email || !props.password || !props.company || !props.domain) throw new Error("Domain Error");
    return new Auth(props);
  };

  public getCompany(): string {
    return this.props.company;
  };

  public getDomain(): string {
    return this.props.domain;
  };
}