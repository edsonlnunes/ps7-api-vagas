import { EProfile, ExpProfile } from "../../../shared/enums/profile.enum";
import UserRepository from "../repositories/user.repository";

export class ListAllUsers {
  async execute(profile?: ExpProfile) {
    const repository = new UserRepository();

    const list = await repository.getUsers(profile);

    return list;
  }
}
