import dataSource from "../../../../main/database/database-connection";
import User from "../../../models/user";
import { UserEntity } from "../../../shared/database/entities/user.entity";

export default class UserRepository {
  async findUserByUsername(username: string): Promise<User> {
    const manager = dataSource.manager;

    const userEntity = await manager.findOne(UserEntity, {
      where: {
        username,
      },
    });

    if (!userEntity) {
      throw new Error("Usuario não encontrado");
    }

    return new User(
      userEntity.name,
      userEntity.username,
      userEntity.profile,
      userEntity.company,
      userEntity.id,
      userEntity.password
    );
  }
}
