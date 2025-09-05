import { User } from "../../entities/user/user.entity.ts";
import type { IUserRepository } from "../../entities/user/user.repository.ts";
import type { IdGeneratorContract } from "../../shared/contracts/id-generator.contract.ts";
import type { UsecaseContract } from "../../shared/contracts/usecase.contract.ts";

import { UserRoleEnum } from "../../entities/user/user.role-enum.ts";

export type UserRegisterManagerUsecaseInput = {
  name: string;
};

export type UserRegisterManagerUsecaseOutput = User;

export class UserRegisterManagerUsecase implements UsecaseContract<UserRegisterManagerUsecaseInput, UserRegisterManagerUsecaseOutput> {
  private constructor(
    private userRepository: IUserRepository,
    private idGenerator: IdGeneratorContract,
    private rolePermissions: Record<UserRoleEnum, string[]>
  ) { };

  public static create(
    userRepository: IUserRepository,
    idGenerator: IdGeneratorContract,
    rolePermissions: Record<UserRoleEnum, string[]>
  ): UserRegisterManagerUsecase {
    return new UserRegisterManagerUsecase(userRepository, idGenerator, rolePermissions);
  };

  async execute({ name }: UserRegisterManagerUsecaseInput): Promise<UserRegisterManagerUsecaseOutput> {
    const id = this.idGenerator.generate();
    const manager = User.create({
      id,
      name,
      permissions: this.rolePermissions.MANAGER,
      role: UserRoleEnum.MANAGER
    });

    await this.userRepository.save(manager);
    return manager;
  };
}