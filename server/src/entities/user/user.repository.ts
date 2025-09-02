import type { User } from "./user.entity.ts";

export interface IUserRepository {
  save(user: User): Promise<void>;
}