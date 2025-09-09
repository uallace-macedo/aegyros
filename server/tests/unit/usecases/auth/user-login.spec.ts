import { UserLoginUsecase, type UserLoginUsecaseInput } from "@usecases/auth/user-login.ts";
import { fakeAuthRepository } from "tests/mocks/repositories/fake-auth-repository.ts";
import { fakePasswordHasher } from "tests/mocks/services/fake-password-hasher.ts";
import { describe, it, expect, beforeAll } from "vitest";

describe("Usecase > User-login", () => {
  const data: UserLoginUsecaseInput = {
    email: "aeg.test@email.com",
    password: "aeg123"
  };

  let userLoginUsecase: UserLoginUsecase;

  beforeAll(() => {
    userLoginUsecase = UserLoginUsecase.create(fakeAuthRepository, fakePasswordHasher);
  });

  it("should be possible to instantiate the usecase", () => {
    expect(userLoginUsecase).toBeInstanceOf(UserLoginUsecase);
    expect(() => UserLoginUsecase.create(fakeAuthRepository, fakePasswordHasher)).not.toThrow();
  });

  it("should be possible to successfully execute usecase", async () => {
    await expect(userLoginUsecase.execute(data)).resolves.not.toThrow();
  });

  it("shouldn't be possible to successfully execute usecase", async () => {
    const invalidData = { password: "eng123" };
    await expect(userLoginUsecase.execute(invalidData as unknown as UserLoginUsecaseInput)).rejects.toThrow();
  });

  it('should return domain as "@aegyros"', async () => {
    const result = await userLoginUsecase.execute(data);
    expect(result.domain).toEqual("@aegyros");
  });
});