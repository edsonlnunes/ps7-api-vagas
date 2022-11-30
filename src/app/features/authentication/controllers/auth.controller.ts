import { Request, Response } from "express";
import LoginUser from "../usecases/login-user.usecase";

export default class AuthController {
  async loginUser(request: Request, response: Response) {
    try {
      const { username, password } = request.body;

      const useCase = new LoginUser();

      const token = await useCase.execute({ username, password });

      return response.status(200).json(token);
    } catch (error: any) {
      return response.status(400).json({ error: error.message, stack: error });
    }
  }
}
