import { Auth } from "@entities/auth/auth.entity.ts";
import { type IAuthRepository } from "@entities/auth/auth.repository.ts";

class FakeAuthRepository implements IAuthRepository {
  async save(auth: Auth): Promise<Auth> {
    return new Promise((res, rej) => {
      res(auth);
    });
  };
};

export const fakeAuthRepository = new FakeAuthRepository();