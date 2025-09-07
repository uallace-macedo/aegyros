import { User } from "../../../entities/user/user.entity.ts";
import type { IUserRepository } from "../../../entities/user/user.repository.ts";
import type { IdGeneratorContract } from "../../../shared/contracts/id-generator.contract.ts";
import type { UsecaseContract } from "../../../shared/contracts/usecase.contract.ts";

import { UserRoleEnum } from "../../../entities/user/user.role-enum.ts";

export type ManagerCreateAccountUsecaseInput = {
  name: string;
};

export type ManagerCreateAccountUsecaseOutput = User;

export class ManagerCreateAccountUsecase implements UsecaseContract<ManagerCreateAccountUsecaseInput, ManagerCreateAccountUsecaseOutput> {
  private constructor(
    private userRepository: IUserRepository,
    private idGenerator: IdGeneratorContract,
    private rolePermissions: Record<UserRoleEnum, string[]>
  ) { };

  public static create(
    userRepository: IUserRepository,
    idGenerator: IdGeneratorContract,
    rolePermissions: Record<UserRoleEnum, string[]>
  ): ManagerCreateAccountUsecase {
    return new ManagerCreateAccountUsecase(userRepository, idGenerator, rolePermissions);
  };

  async execute({ name }: ManagerCreateAccountUsecaseInput): Promise<ManagerCreateAccountUsecaseOutput> {
    const id = this.idGenerator.generate();
    const manager = User.create({
      id,
      name,
      permissions: this.rolePermissions.MANAGER,
      role: UserRoleEnum.MANAGER,
      company: null
    });

    await this.userRepository.save(manager);
    return manager;
  };
}