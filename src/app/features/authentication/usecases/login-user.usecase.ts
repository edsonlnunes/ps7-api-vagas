import UserRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import envsConfig from "../../../../main/env/envs-config";

interface RequestData {
  username: string;
  password: string;
}

export default class LoginUser {
  async execute({ username, password }: RequestData): Promise<string> {
    const userRepository = new UserRepository();

    const userFind = await userRepository.findUserByUsername(username);

    const passwordConfirm = await bcrypt.compare(password, userFind.password);

    if (!passwordConfirm) {
      throw new Error("Senha inválida");
    }

    const token = sign({ name: userFind.name }, envsConfig.SECRET_TOKEN!, {
      expiresIn: envsConfig.EXPIRE_IN,
    });

    return token;
  }
}
