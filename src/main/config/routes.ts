import { Express } from "express";
import authRoutes from "../../app/features/authentication/auth.routes";
import usersRoutes from "../../app/features/users/users.routes";

export default (app: Express) => {
  app.get("/", (request, response) => response.status(200).send("API RODANDO"));

  // rotas da feature users
  app.use(usersRoutes());
  app.use(authRoutes());
};
