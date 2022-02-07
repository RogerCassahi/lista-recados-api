import { Message } from "../../../features/messages/domain/model/message";
import { MessageRepository } from "../../../features/messages/infra/repository/message.repository";
import Redis from "../data/connections/redis";

export class CacheRepository {
  async set(uid: string): Promise<any> {
    const userMessagesList = await this.refreshRedis(uid);

    if (!userMessagesList) return false;
    return userMessagesList;
  }

  async get(uidUser: string): Promise<any | undefined> {
    const redis = await Redis.getConnection();
    const result = await redis.get(`roger:${uidUser}:messages`);
    if (!result) return undefined;
    return result;
  }

  async delete(uidUser: string): Promise<boolean> {
    const redis = await Redis.getConnection();
    const result = await redis.del(`roger:${uidUser}:messages`);
    return result > 0;
  }

  private async refreshRedis(uidUser: string): Promise<any | null> {
    const repository = new MessageRepository();
    const userMessages = await repository.getAllMessages(uidUser);

    await this.delete(uidUser);

    const redis = await Redis.getConnection();
    const result = await redis.set(
      `roger:${uidUser}:messages`,
      JSON.stringify(userMessages)
    );

    return result;
  }
}
