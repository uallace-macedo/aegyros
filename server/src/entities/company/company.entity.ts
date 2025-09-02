type CompanyProps = {
  id: string;
  name: string;
  domain: string;
  managers: string[];
  employees: string[];
  branches: string[];
}

export class Company {
  private constructor(private props: CompanyProps) { };
  public static create(props: CompanyProps): Company {
    return new Company(props);
  };

  public getDomain(): string {
    return this.props.domain;
  };

  public getManagers(): string[] {
    return this.props.managers;
  };

  public getEmployees(): string[] {
    return this.props.employees;
  };

  public getBranches(): string[] {
    return this.props.branches;
  };
}