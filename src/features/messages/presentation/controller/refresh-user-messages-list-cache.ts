import { CacheRepository } from "../../../../core/infra/repository/cache.repository";
import { MessageRepository } from "../../infra/repository/message.repository";

export class RefreshUserMessagesList{
  async handle(user:string): Promise<any> {
    try {
      const repository = new MessageRepository();
      const cache = new CacheRepository();
      await cache.delete(`roger:${user}:messages`)  
      const messages = await repository.getAllMessages(user)
      const result = await cache.set(`roger:${user}:messages`, messages);

      if (!result) false
      return true
    } catch (error: any) {
      return error
    }
  }
}
