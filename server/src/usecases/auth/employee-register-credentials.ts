import { Auth } from "@entities/auth/auth.entity.ts";
import { User } from "@entities/user/user.entity.ts";
import { UserRoleEnum } from "@entities/user/user.role-enum.ts";
import { rolePermissions } from "@constants/role-permissions.constant.ts";

import type { IAuthRepository } from "@entities/auth/auth.repository.ts";
import type { IUserRepository } from "@entities/user/user.repository.ts";
import type { UsecaseContract } from "@contracts/usecase.contract.ts";
import type { IPasswordHasher } from "@contracts/password-hasher.contract.ts";
import type { IdGeneratorContract } from "@contracts/id-generator.contract.ts";

export type EmployeeRegisterUsecaseInput = {
  name: string;
  email: string;
  password: string;
  domain: string;
  company: string;
};

export type EmployeeRegisterUsecaseOutput = {
  id: string;
  name: string;
  company: string;
  role: UserRoleEnum;
  permissions: string[]
};

export class EmployeeRegisterUsecase implements UsecaseContract<EmployeeRegisterUsecaseInput, EmployeeRegisterUsecaseOutput> {
  private constructor(
    private authRepository: IAuthRepository,
    private userRepository: IUserRepository,
    private idGenerator: IdGeneratorContract,
    private passwordHasher: IPasswordHasher
  ) { };

  public static create(
    authRepository: IAuthRepository,
    userRepository: IUserRepository,
    idGenerator: IdGeneratorContract,
    passwordHasher: IPasswordHasher
  ): EmployeeRegisterUsecase {
    return new EmployeeRegisterUsecase(authRepository, userRepository, idGenerator, passwordHasher);
  };

  async execute({ name, email, password, domain, company }: EmployeeRegisterUsecaseInput): Promise<EmployeeRegisterUsecaseOutput> {
    const auth = Auth.create({
      id: this.idGenerator.generate(),
      name, email,
      password: await this.passwordHasher.hash(password),
      domain, company
    });

    const user = User.create({
      id: this.idGenerator.generate(),
      name,
      company,
      role: UserRoleEnum.EMPLOYEE,
      permissions: rolePermissions.EMPLOYEE
    });

    await this.authRepository.save(auth);
    await this.userRepository.save(user);

    const output = this.presentOutput(user);
    return output;
  };

  private presentOutput(user: User): EmployeeRegisterUsecaseOutput {
    return {
      id: user.id,
      name: user.name,
      company: user.company,
      role: user.role,
      permissions: user.getPermissions()
    };
  };
};