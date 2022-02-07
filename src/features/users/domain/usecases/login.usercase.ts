import { UserRepository } from "../../infra/repositories/user.repository";
import { User } from "../model/user";

export class Login {
  async execute(params: any): Promise<any> {
    const repository = new UserRepository();
    const result = await repository.findUsername(params.username);
    if (!result) return "error-username";

    if (
      params.username !== result.username ||
      params.password !== result.password
    )
      throw new Error("Login está incorreto");

    return result.uid;
  }
}
