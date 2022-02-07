import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import {
  serverError,
  ok,
} from "../../../../core/presentation/helpers/http-helper";
import { CreateUser } from "../../domain/usecases/create-user.usecase";

export class CreateUserController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    const data = req.body;
    try {
      const repository = new CreateUser();
      const result = await repository.execute(data);

      return ok(res, result);
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
