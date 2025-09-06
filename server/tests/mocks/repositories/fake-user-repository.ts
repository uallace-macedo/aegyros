import type { User } from "@entities/user/user.entity.ts";
import { type IUserRepository } from "@entities/user/user.repository.ts";

class FakeUserRepository implements IUserRepository {
  save(user: User): Promise<void> {
    return new Promise((res, rej) => {
      res();
    });
  };
};

export const fakeUserRepository = new FakeUserRepository();