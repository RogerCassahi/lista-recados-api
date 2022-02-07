import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repository/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controller";
import {
  serverError,
  ok,
} from "../../../../core/presentation/helpers/http-helper";
import { MessageRepository } from "../../infra/repository/message.repository";
export class GetAllMessages implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { uid } = req.params;
      const cache = new CacheRepository();
      const messagesCache = await cache.get(`roger:${uid}:messages`);
      if (messagesCache) {
        return ok(res, Object.assign({}, messagesCache, { _cache: true }));
      }
      const repository = new MessageRepository();
      const findUserMessages = await repository.getAllMessages(uid);

      return ok(res, findUserMessages);
    } catch (error: any) {
      serverError(res, error);
    }
  }
}
