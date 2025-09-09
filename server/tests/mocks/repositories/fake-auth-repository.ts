import { Auth } from "@entities/auth/auth.entity.ts";
import { type IAuthRepository } from "@entities/auth/auth.repository.ts";

class FakeAuthRepository implements IAuthRepository {
  async save(auth: Auth): Promise<Auth> {
    return new Promise((res, rej) => {
      res(auth);
    });
  };

  async findByEmail(email: string): Promise<Auth> {
    return new Promise((res, rej) => {
      res(Auth.create({
        id: "0001",
        company: "asaaijoda",
        domain: "@aegyros",
        email,
        name: "asiudad",
        password: "aiudsaiu"
      }));
    });
  };
};

export const fakeAuthRepository = new FakeAuthRepository();