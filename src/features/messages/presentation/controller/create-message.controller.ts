import { Request, Response } from "express";
import { CacheRepository } from "../../../../core/infra/repository/cache.repository";
import { Controller } from "../../../../core/presentation/contracts/controller";
import {
  serverError,
  ok,
} from "../../../../core/presentation/helpers/http-helper";
import { MessageRepository } from "../../infra/repository/message.repository";
import { RefreshUserMessagesList } from "./refresh-user-messages-list-cache";

export class CreateMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body
      const repository = new MessageRepository();
      const message = await repository.create(req.body);
      const refreshMessages = new RefreshUserMessagesList()
      const result = await refreshMessages.handle(data.user)
      if (!result) console.log("Não salvou no cache");
      return ok(res, message);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
