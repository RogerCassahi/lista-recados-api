import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import {
  serverError,
  ok,
} from "../../../../core/presentation/helpers/http-helper";
import { MessageRepository } from "../../infra/repository/message.repository";
export class DeleteMessage implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { uid } = req.params;
      const repository = await new MessageRepository();
      const result = repository.deleteMessage(uid);

      return ok(res, result);
    } catch (error: any) {
      serverError(res, error);
    }
  }
}
