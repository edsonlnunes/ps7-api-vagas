import User from "../../../models/user";
import dataSource from "../../../../main/database/database-connection";
import { UserEntity } from "../../../shared/database/entities/user.entity";

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

  async getUsers(): Promise<User[]> {
    return [];
  }
}
