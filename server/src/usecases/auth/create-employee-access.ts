import { Auth } from "../../entities/auth/auth.entity.ts";
import type { IAuthRepository } from "../../entities/auth/auth.repository.ts";
import type { IRandomPasswordGenerator } from "../../shared/contracts/random-password-generator.contract.ts";
import type { UsecaseContract } from "../../shared/contracts/usecase.contract.ts";

export type CreateEmployeeAcessUsecaseInput = {
  name: string;
  email: string;
  domain: string;
  company: string;
};

export type CreateEmployeeAcessUsecaseOutput = {};

export class CreateEmployeeAcessUsecase implements UsecaseContract<CreateEmployeeAcessUsecaseInput, CreateEmployeeAcessUsecaseOutput> {
  private constructor(
    private authRepository: IAuthRepository,
    private randomPasswordGenerator: IRandomPasswordGenerator
  ) { };

  public static create(
    authRepository: IAuthRepository,
    randomPasswordGenerator: IRandomPasswordGenerator
  ): CreateEmployeeAcessUsecase {
    return new CreateEmployeeAcessUsecase(authRepository, randomPasswordGenerator);
  };

  async execute({ name, email, domain, company }: CreateEmployeeAcessUsecaseInput): Promise<CreateEmployeeAcessUsecaseOutput> {
    const data = {
      name, email, domain, company,
      password: await this.randomPasswordGenerator.generate(),
    };

    const auth = Auth.create(data);
    await this.authRepository.save(auth);
    // TODO: Add email service & send email to employee

    return { email, domain };
  }
}