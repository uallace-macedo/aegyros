import crypto from "crypto";
import type { IRandomPasswordGenerator } from "../shared/contracts/random-password-generator.contract.ts";

export class CryptoPasswordGeneratorService implements IRandomPasswordGenerator {
  private constructor() { };
  public static create(): CryptoPasswordGeneratorService {
    return new CryptoPasswordGeneratorService();
  };

  async generate(): Promise<string> {
    return new Promise((res, rej) => {
      crypto.randomBytes(8, (err, buff) => {
        if (err) return rej(err);
        res(buff.toString("hex"));
      });
    });
  };
}