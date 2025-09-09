import { type IPasswordHasher } from "@contracts/password-hasher.contract.ts";

class FakePasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return "hashedPass"
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    if (password == hashedPassword) return true;
    return false;
  };
};

export const fakePasswordHasher = new FakePasswordHasher();