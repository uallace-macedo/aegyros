import { Auth } from "../../entities/auth/auth.entity.ts";
import type { IAuthRepository } from "../../entities/auth/auth.repository.ts";
import type { IPasswordHasher } from "../../shared/contracts/password-hasher.contract.ts";
import type { UsecaseContract } from "../../shared/contracts/usecase.contract.ts";

export type RegisterCredentialsUsecaseInput = {
  email: string;
  password: string;
  company: string;
  domain: string;
};

export type RegisterCredentialsUsecaseOutput = {
  email: string;
  domain: string;
};

export class RegisterCredentialsUsecase implements UsecaseContract<RegisterCredentialsUsecaseInput, RegisterCredentialsUsecaseOutput> {
  private constructor(
    private authRepository: IAuthRepository,
    private passwordHasher: IPasswordHasher
  ) { };

  public static create(
    authRepository: IAuthRepository,
    passwordHasher: IPasswordHasher
  ): RegisterCredentialsUsecase {
    return new RegisterCredentialsUsecase(authRepository, passwordHasher);
  };

  async execute({ email, password, company, domain }: RegisterCredentialsUsecaseInput): Promise<RegisterCredentialsUsecaseOutput> {
    const data = {
      email, company, domain,
      password: await this.passwordHasher.hash(password)
    };

    const auth = Auth.create(data);
    await this.authRepository.save(auth);

    return { email, domain };
  };
}