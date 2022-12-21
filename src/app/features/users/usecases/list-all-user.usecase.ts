import { ExpProfile } from "../../../shared/enums/profile.enum";
import UserRepository from "../repositories/user.repository";

export class ListAllUsers {
  private _repository: UserRepository;

  constructor(repository: UserRepository) {
    this._repository = repository;
  }

  async execute(profile?: ExpProfile) {
    // const repository = new UserRepository();

    const list = await this._repository.getUsers(profile);

    return list;
  }
}
