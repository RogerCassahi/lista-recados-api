import { UserEntity } from "../../../../core/infra/data/database/entities/UserEntity";

export class UserRepository {
  async findUsername(username: any): Promise<any> {
    const usernameFind: any = await UserEntity.findOne({ where: { username } });
    if (usernameFind === undefined) return false;
    return usernameFind;
  }

  async findUid(uid: any): Promise<any> {
    const uidFind: any = await UserEntity.findOne({ where: { uid } });
    if (uidFind === undefined) return false;

    return uidFind;
  }
}
