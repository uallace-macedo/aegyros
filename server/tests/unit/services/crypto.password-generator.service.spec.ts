import { describe, it, expect, beforeAll } from "vitest";
import { CryptoPasswordGeneratorService } from "@services/crypto.password-generator.service.ts";

describe("Service > CryptoPasswordGenerator", () => {
  let cpgs: CryptoPasswordGeneratorService;

  beforeAll(() => {
    cpgs = CryptoPasswordGeneratorService.create();
  });

  it("should be possible to instantiate the service successfully", () => {
    expect(cpgs).toBeInstanceOf(CryptoPasswordGeneratorService);
  });

  it("should be possible to generate a random password with 8 bytes", async () => {
    const pass = await cpgs.generate();
    expect(pass.length).toEqual(16);
  });
});