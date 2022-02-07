import { UserEntity } from "../../../../core/infra/data/database/entities/UserEntity";
import { UserRepository } from "../../infra/repositories/user.repository";
import { User } from "../model/user";

export class CreateUser {
  async execute(params: User): Promise<Boolean> {
    if (
      params.username == "" ||
      params.password == "" ||
      params.confirmPassword == ""
    )
      throw new Error("Por favor, insira as informações");

    const userExistsByUsername = await new UserRepository().findUsername(
      params.username
    );

    if (userExistsByUsername)
      throw new Error("Este username já está sendo usado");

    if (params.password !== params.confirmPassword)
      throw new Error("Sua senha de confirmação está diferente.");

    UserEntity.create({
      username: params.username,
      password: params.password,
    }).save();

    return true;
  }
}
