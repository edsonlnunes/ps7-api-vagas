import { Request, Response } from "express";
import CreateUser from "../usecases/create-user.usecase";

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
}
