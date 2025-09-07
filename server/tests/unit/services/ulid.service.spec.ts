import { ULIDService } from "@services/ulid.service.ts";
import { describe, it, expect, beforeAll } from "vitest";

describe("Service > ULIDService", () => {
  let ulid: ULIDService;

  beforeAll(() => {
    ulid = ULIDService.create();
  });

  it("should successfully instantiate an ULID Service", () => {
    expect(() => ULIDService.create()).not.toThrow();
    expect(ulid).toBeInstanceOf(ULIDService);
  });

  it("should successfully generate an ID", () => {
    expect(() => ulid.generate()).not.toThrow();
  });
});