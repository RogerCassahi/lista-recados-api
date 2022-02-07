import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import {
  serverError,
  ok,
} from "../../../../core/presentation/helpers/http-helper";
import { Login } from "../../domain/usecases/login.usercase";
export class LoginUserController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    const data = req.body;
    try {
      const usecase = new Login();
      const result = await usecase.execute(data);

      return ok(res, result);
    } catch (error: any) {
      serverError(res, error);
    }
  }
}
