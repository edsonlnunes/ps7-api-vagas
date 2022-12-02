import { Router } from "express";
import { EProfile } from "../../shared/enums/profile.enum";
import TokenValidator from "../../shared/validators/token.validator";
import UserController from "./controllers/user.controller";
import CreateUserValidator from "./validators/create-user.validator";
import { ProfileValidator } from "./validators/profile.validator";

export default () => {
  const router = Router();

  const userController = new UserController();

  router.post(
    "/",
    new CreateUserValidator().validate,
    userController.createUser
  );

  router.get("/", new TokenValidator().validate, 
    new ProfileValidator().validate,
    userController.listAllUsers);

  return router;
};
