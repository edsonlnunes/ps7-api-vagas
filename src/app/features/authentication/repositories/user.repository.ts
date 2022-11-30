import dataSource from "../../../../main/database/database-connection";
import { UserEntity } from "../../../shared/database/entities/user.entity";

export default class UserRepository {
  async findUserByUsername(username: string): Promise<UserEntity> {
    const manager = dataSource.manager;

    const userEntity = await manager.findOne(UserEntity, {
      where: {
        username,
      },
    });

    if (!userEntity) {
      throw new Error("Usuario não encontrado");
    }

    return userEntity;
  }
}
