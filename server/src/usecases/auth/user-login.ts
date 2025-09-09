import type { IPasswordHasher } from "@contracts/password-hasher.contract.ts";
import type { UsecaseContract } from "@contracts/usecase.contract.ts";
import type { IAuthRepository } from "@entities/auth/auth.repository.ts";

export type UserLoginUsecaseInput = {
  email: string;
  password: string;
};

export type UserLoginUsecaseOutput = {
  domain: string;
};

export class UserLoginUsecase implements UsecaseContract<UserLoginUsecaseInput, UserLoginUsecaseOutput> {
  private constructor(
    private authRepository: IAuthRepository,
    private passwordHasher: IPasswordHasher
  ) { };

  public static create(authRepository: IAuthRepository, passwordHasher: IPasswordHasher): UserLoginUsecase {
    return new UserLoginUsecase(authRepository, passwordHasher);
  };

  async execute({ email, password }: UserLoginUsecaseInput): Promise<UserLoginUsecaseOutput> {
    const auth = await this.authRepository.findByEmail(email);
    const correctPassword = this.passwordHasher.compare(password, (auth.getPassword() || ""));

    if (!auth || !correctPassword) throw new Error("Credenciais inválidas!");
    return { domain: auth.getDomain() };
  };
}