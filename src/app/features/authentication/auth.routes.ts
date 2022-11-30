import { Router } from "express";
import AuthController from "./controllers/auth.controller";
import LoginUserValidator from "../authentication/validators/login-user.validator";

export default () => {
  const router = Router();

  const authController = new AuthController();

  router.post(
    "/login",
    new LoginUserValidator().validate,
    authController.loginUser
  );

  return router;
};
