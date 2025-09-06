import { type IRandomPasswordGenerator } from "@contracts/random-password-generator.contract.ts";

class FakeRandomPasswordGenerator implements IRandomPasswordGenerator {
  generate(): Promise<string> {
    return new Promise((res, rej) => {
      res("randompass")
    });
  };
};

export const fakeRandomPasswordGenerator = new FakeRandomPasswordGenerator();