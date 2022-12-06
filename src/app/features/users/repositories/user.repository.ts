import User from "../../../models/user";
import dataSource from "../../../../main/database/database-connection";
import { UserEntity } from "../../../shared/database/entities/user.entity";
import { EProfile, ExpProfile } from "../../../shared/enums/profile.enum";

export default class UserRepository {
  async verifyUserExistsByUsername(username: string): Promise<boolean> {
    const manager = dataSource.manager;

    const userEntity = await manager.findOne(UserEntity, {
      where: { username },
    });

    return !!userEntity;
  }

  async createUser(user: User, encryptedPassword: string): Promise<void> {
    const manager = dataSource.manager;

    const userEntity = manager.create(UserEntity, {
      id: user.id,
      name: user.name,
      password: encryptedPassword,
      profile: user.profile,
      company: user.company,
      username: user.username,
    });

    await manager.save(userEntity);
  }

  async getUsers(profile: ExpProfile | undefined): Promise<User[]> {
    const manager = dataSource.manager;

    const listAllUsers = await manager.find(UserEntity, {
      where: { profile: profile },
    });

    const list = listAllUsers.map((user) => {
      return new User(
        user.name,
        user.username,
        user.profile,
        user.company,
        user.id
      );
    });

    return list;
  }
}
