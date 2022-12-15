import UserRepository from "../../../../../src/app/features/users/repositories/user.repository";
import CreateUser from "../../../../../src/app/features/users/usecases/create-user.usecase";

describe("Testar a criação do usuário", () => {
  test("Testa se o usuário já existe e mostra um erro", async () => {
    const repository = new UserRepository();
    const sut = new CreateUser(repository);
    jest
      .spyOn(UserRepository.prototype, "verifyUserExistsByUsername")
      .mockResolvedValue(true);

    expect(() =>
      sut.execute({
        name: "any_name",
        username: "any_username",
        profile: "CANDIDATE",
        company: "any_cia",
        password: "123",
      })
    ).rejects.toThrowError("Já existe um usuário com este username");
  });
});
