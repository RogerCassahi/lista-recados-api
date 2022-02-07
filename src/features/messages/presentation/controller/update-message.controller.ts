import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repository/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controller";
import {
  notFound,
  ok,
  serverError,
} from "../../../../core/presentation/helpers/http-helper";
import { MessageRepository } from "../../infra/repository/message.repository";

export class UpdateMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;
      const message = await new MessageRepository();
      const result = await message.updateMessage(data);
      const cacheRepository = new CacheRepository();
      await cacheRepository.set(data.user);

      if (!result) return notFound(res);
      return ok(res, result);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
