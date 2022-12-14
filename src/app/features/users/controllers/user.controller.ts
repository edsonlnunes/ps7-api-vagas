import { Request, Response } from "express";
import { ExpProfile } from "../../../shared/enums/profile.enum";
import UserRepository from "../repositories/user.repository";
import CreateUser from "../usecases/create-user.usecase";
import { ListAllUsers } from "../usecases/list-all-user.usecase";

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

  async listUsers(request: Request, response: Response) {
    const { profile } = request.query;

    try {
      const usecase = new ListAllUsers(new UserRepository());
      return response
        .status(200)
        .json(await usecase.execute(profile as ExpProfile | undefined));
    } catch (error: any) {
      return response.status(400).json({ error: error.message, stack: error });
    }
  }
}

// instanciar usecase
// mandar executar usecase
// retornar o que usecase devolver
// tratativa de erro ✅
