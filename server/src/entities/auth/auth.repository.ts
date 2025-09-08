import type { Auth } from "./auth.entity.ts";

export interface IAuthRepository {
  save(auth: Auth): Promise<Auth>;
  findByEmail(email: string): Promise<Auth> | null;
}