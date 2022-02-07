import { Router } from "express";
import { CreateUserController } from "../controller/create-user.controller";
import { LoginUserController } from "../controller/login-user.controller";

export default class UserRoutes {
  public init(): Router {
    const routes = Router();
    routes.post("/cadastro", new CreateUserController().handle);
    routes.post("/login", new LoginUserController().handle);
    return routes;
  }
}
