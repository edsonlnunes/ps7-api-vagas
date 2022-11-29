import UserRepository from "../repositories/user.repository";
import bcryp from "bcrypt";
import User from "../../../models/user";
import { EProfile } from "../../../shared/enums/profile.enum";

interface RequestData {
  name: string;
  username: string;
  password: string;
  company: string;
  profile: EProfile;
}

export default class CreateUser {
  async execute({
    name,
    username,
    password,
    company,
    profile,
  }: RequestData): Promise<any> {
    // verificar se o usuário já existe
    const userRepository = new UserRepository();

    const userExists = await userRepository.verifyUserExistsByUsername(
      username
    );

    if (userExists) {
      throw new Error("Já existe um usuário com este username");
    }

    // encryptografar a senha
    const encryptedPassword = await bcryp.hash(password, 8);

    // salvar no banco de dados
    const user = new User(name, username, profile, company);

    await userRepository.createUser(user, encryptedPassword);

    return user.toJson();
  }
}
