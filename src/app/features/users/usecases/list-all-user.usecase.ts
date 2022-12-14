import { ExpProfile } from "../../../shared/enums/profile.enum";

export class ListAllUsers {
  private _repository;

  constructor(repository: any) {
    this._repository = repository;
  }

  async execute(profile?: ExpProfile) {
    // const repository = new UserRepository();

    const list = await this._repository.getUsers(profile);

    return list;
  }
}
