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

    const user = await userRepository.findUserByUsername(username);

    const passwordConfirm = await bcrypt.compare(password, user.password!);

    if (!passwordConfirm) {
      throw new Error("Senha inválida");
    }

    user.removePassword();

    const payloadToken = {
      userId: user.id,
      company: user.company,
      profile: user.profile,
    };

    const token = sign(payloadToken, envsConfig.SECRET_TOKEN!, {
      expiresIn: envsConfig.EXPIRE_IN,
    });

    return token;
  }
}
