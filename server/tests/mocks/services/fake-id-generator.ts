import { type IdGeneratorContract } from "@contracts/id-generator.contract.ts";

class FakeIdGenerator implements IdGeneratorContract {
  generate(): string {
    return "idGenerated"
  };
};

export const fakeIdGenerator = new FakeIdGenerator();