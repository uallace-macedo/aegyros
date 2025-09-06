import { type IPasswordHasher } from "@contracts/password-hasher.contract.ts";

class FakePasswordHasher implements IPasswordHasher {
  hash(password: string): Promise<string> {
    return new Promise((res, rej) => {
      res("hashedpass")
    });
  }

  compare(password: string, hashedPassword: string): Promise<boolean> {
    return new Promise((res, rej) => {
      if (password == hashedPassword) {
        res(true);
      } else {
        rej(false);
      };
    });
  };
};

export const fakePasswordHasher = new FakePasswordHasher();