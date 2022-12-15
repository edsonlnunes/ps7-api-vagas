import { ListAllUsers } from "../../../../../src/app/features/users/usecases/list-all-user.usecase";
import UserRepository from "../../../../../src/app/features/users/repositories/user.repository";
import User from "../../../../../src/app/models/user";

describe.skip("Testar listagem de todos os usuários", () => {
  test("Testa método execute", async () => {
    const sut = new ListAllUsers(new UserRepository());
    jest.spyOn(UserRepository.prototype, "getUsers").mockResolvedValue([]);
    const listUsers = await sut.execute();

    expect(listUsers).toBeTruthy();
    expect(listUsers).toHaveLength(0);
  });

  test("Testa método execute com um usuário", async () => {
    const sut = new ListAllUsers(new UserRepository());
    jest
      .spyOn(UserRepository.prototype, "getUsers")
      .mockResolvedValue([
        new User("Any-user", "any-user", "ADMIN"),
        new User("Any-user", "any-user", "CANDIDATE"),
      ]);
    const listUsers = await sut.execute();

    expect(listUsers).toBeTruthy();
    expect(listUsers).toHaveLength(2);
  });
});
