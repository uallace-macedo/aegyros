import { describe, it, expect } from "vitest";
import { Auth, type AuthProps } from "@entities/auth/auth.entity.ts";

describe("Entity: Auth", () => {
  const data: AuthProps = {
    name: "ablubluble",
    email: "aaa@domain.com",
    password: "somethingHashed",
    company: "1000x",
    domain: "@aaa"
  }

  it("should be possible to instantiate a Auth object", () => {
    const auth = Auth.create(data);
    expect(auth).toBeInstanceOf(Auth);
  });

  it("shouldn't be possible to instantiate a Auth object", () => {
    const { company, ...props } = data;
    expect(() => {
      Auth.create(props as unknown as AuthProps)
    }).toThrow();
  });

  it("should be possible to get company id", () => {
    const auth = Auth.create(data);
    const company = auth.getCompany();

    expect(company).toEqual(data.company);
  });

  it("should be possible to get domain", () => {
    const auth = Auth.create(data);
    const domain = auth.getDomain();

    expect(domain).toEqual(data.domain);
  });
})