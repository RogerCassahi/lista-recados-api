import Database from "./core/infra/data/connections/database";
import Redis from "./core/infra/data/connections/redis";
import App from "./core/presentation/app";

Promise.all([new Database().openConnection(), new Redis().openConnection()])
  .then(() => {
    const app = new App();
    app.init();
    app.start(process.env.PORT || "3333");
  })
  .catch((error) => {
    console.log(error);
  });
