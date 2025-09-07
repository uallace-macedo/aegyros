import type { IdGeneratorContract } from "@contracts/id-generator.contract.ts";
import { ulid } from "ulid";

export class ULIDService implements IdGeneratorContract {
  private constructor() { };
  public static create(): ULIDService {
    return new ULIDService();
  };

  generate(): string {
    return ulid();
  };
}