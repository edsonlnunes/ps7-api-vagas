import { Router } from "express";
import TokenValidator from "../../shared/validators/token.validator";
import UserController from "./controllers/user.controller";
import CreateUserValidator from "./validators/create-user.validator";
import LoginUserValidator from "./validators/login-user.validator";

export default () => {
  const router = Router();

  const userController = new UserController();

  router.post(
    "/users",
    new CreateUserValidator().validate,
    userController.createUser
  );

  router.post(
    "/users/login",
    new LoginUserValidator().validate,
    userController.loginUser
  );

  router.get(
    "/users",
    new TokenValidator().validate,
    userController.listAllUsers
  );

  return router;
};
