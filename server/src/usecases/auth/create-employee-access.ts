import { Auth } from "@entities/auth/auth.entity.ts";
import { User } from "@entities/user/user.entity.ts";
import { UserRoleEnum } from "@entities/user/user.role-enum.ts";
import { rolePermissions } from "@constants/role-permissions.constant.ts";

import type { IAuthRepository } from "@entities/auth/auth.repository.ts";
import type { IUserRepository } from "@entities/user/user.repository.ts";
import type { UsecaseContract } from "@contracts/usecase.contract.ts";
import type { IPasswordHasher } from "@contracts/password-hasher.contract.ts";
import type { IdGeneratorContract } from "@contracts/id-generator.contract.ts";

export type CreateEmployeeAcessUsecaseInput = {
  name: string;
  email: string;
  password: string;
  domain: string;
  company: string;
};

export type CreateEmployeeAcessUsecaseOutput = {
  name: string;
  company: string;
  role: UserRoleEnum;
  permissions: string[]
};

export class CreateEmployeeAcessUsecase implements UsecaseContract<CreateEmployeeAcessUsecaseInput, CreateEmployeeAcessUsecaseOutput> {
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
  ): CreateEmployeeAcessUsecase {
    return new CreateEmployeeAcessUsecase(authRepository, userRepository, idGenerator, passwordHasher);
  };

  async execute({ name, email, password, domain, company }: CreateEmployeeAcessUsecaseInput): Promise<CreateEmployeeAcessUsecaseOutput> {
    const auth = Auth.create({
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

  private presentOutput(user: User): CreateEmployeeAcessUsecaseOutput {
    return {
      name: user.name,
      company: user.company,
      role: user.role,
      permissions: user.getPermissions()
    };
  };
};