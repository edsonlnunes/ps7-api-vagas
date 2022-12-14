import { Router } from "express";
import TokenValidator from "../../shared/validators/token.validator";
import UserController from "./controllers/user.controller";
import CreateUserValidator from "./validators/create-user.validator";
import { IsAdminValidator } from "./validators/is-admin.validator";
import { ListUserQueryValidator } from "./validators/list-user-query.validator";

export default () => {
  const router = Router();

  const userController = new UserController();

  router.post(
    "/",
    new CreateUserValidator().validate,
    userController.createUser
  );

  router.get(
    "/",
    new TokenValidator().validate,
    new IsAdminValidator().validate,
    new ListUserQueryValidator().validate,
    userController.listUsers
  );

  return router;
};
