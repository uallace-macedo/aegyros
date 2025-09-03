import { User } from "../../entities/user/user.entity.ts";
import type { IUserRepository } from "../../entities/user/user.repository.ts";
import type { IdGeneratorContract } from "../../shared/contracts/id-generator.contract.ts";
import type { UsecaseContract } from "../../shared/contracts/usecase.contract.ts";

export type UserRegisterManagerUsecaseInput = {
  name: string;
};

export type UserRegisterManagerUsecaseOutput = User;

export class UserRegisterManagerUsecase implements UsecaseContract<UserRegisterManagerUsecaseInput, UserRegisterManagerUsecaseOutput> {
  private constructor(
    private userRepository: IUserRepository,
    private idGenerator: IdGeneratorContract
  ) { };

  public static create(userRepository: IUserRepository, idGenerator: IdGeneratorContract): UserRegisterManagerUsecase {
    return new UserRegisterManagerUsecase(userRepository, idGenerator);
  };

  async execute({ name }: UserRegisterManagerUsecaseInput): Promise<UserRegisterManagerUsecaseOutput> {
    const id = this.idGenerator.generate();
    const manager = User.create({
      id,
      name,
      permissions: ["all"],
      role: "MANAGER"
    });

    await this.userRepository.save(manager);
    return manager;
  };
}