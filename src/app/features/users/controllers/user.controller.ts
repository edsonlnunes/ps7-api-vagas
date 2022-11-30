import { Request, Response } from "express";
import CreateUser from "../usecases/create-user.usecase";
import LoginUser from "../usecases/login-user.usercase";

export default class UserController {
  async createUser(request: Request, response: Response) {
    try {
      const usecase = new CreateUser();

      const result = await usecase.execute(request.body);

      return response.status(200).json(result);

    } catch (error: any) {
      return response.status(500).json({ error: error.message, stack: error });
    }
  }

  async listAllUsers(request: Request, response: Response) {
    // instanciar usecase
    // mandar executar usecase
    // retornar o que usecase devolver
    // tratativa de erro
  }

  async loginUser(request: Request, response: Response) {
    try {
      console.log(request.headers.authorization);

      const { username, password } = request.body;
      // const username = request.body.username;
      // const password = request.body.password;
      const useCase = new LoginUser();

      const token = await useCase.execute({ username, password })

      return response.status(200).json(token)
    } catch (error: any) {
      return response.status(400).json({ error: error.message, stack: error })
    }
  }
}
