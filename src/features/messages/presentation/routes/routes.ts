import { Router } from "express";
import { CreateMessageController } from "../controller/create-message.controller";
import { DeleteMessage } from "../controller/delete-message.controller";
import { GetAllMessages } from "../controller/get-all-messages.controller";
import { UpdateMessageController } from "../controller/update-message.controller";

export default class MessageRoutes {
  public init(): Router {
    const routes = Router();
    routes.post("/message", new CreateMessageController().handle);
    routes.get("/message/:uid", new GetAllMessages().handle);
    routes.put("/message", new UpdateMessageController().handle);
    routes.delete("/message/:uid", new DeleteMessage().handle);
    return routes;
  }
}
