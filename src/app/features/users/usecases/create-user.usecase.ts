import UserRepository from "../repositories/user.repository";
import bcryp from "bcrypt";
import User from "../../../models/user";
import { ExpProfile } from "../../../shared/enums/profile.enum";

interface RequestData {
  name: string;
  username: string;
  password: string;
  company: string;
  profile: ExpProfile;
}

export default class CreateUser {
  private _repository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._repository = userRepository;
  }

  async execute({
    name,
    username,
    password,
    company,
    profile,
  }: RequestData): Promise<any> {
    // verificar se o usuário já existe

    // const userRepository = new UserRepository();

    const userExists = await this._repository.verifyUserExistsByUsername(
      username
    );

    if (userExists) {
      throw new Error("Já existe um usuário com este username");
    }

    // encryptografar a senha
    const encryptedPassword = await bcryp.hash(password, 8);

    // salvar no banco de dados
    const user = new User(name, username, profile, company);

    await this._repository.createUser(user, encryptedPassword);

    return user.toJson();
  }
}
