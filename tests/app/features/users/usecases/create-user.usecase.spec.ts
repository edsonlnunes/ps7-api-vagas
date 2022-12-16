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

  test("Teste de erro com try catch", async () => {
    const repository = new UserRepository();
    const sut = new CreateUser(repository);
    jest
      .spyOn(UserRepository.prototype, "verifyUserExistsByUsername")
      .mockResolvedValue(true);
    try {
      await sut.execute({
        name: "any_name",
        username: "any_username",
        profile: "CANDIDATE",
        company: "any_cia",
        password: "123",
      })
    } catch (error: any) {
      console.log(error);
      
      expect(error.message).toEqual("Já existe um usuário com este username");
      
    }
  });

  test("Teste de criaçao de usuario com sucesso", async () => {
    const repository = new UserRepository();
    const sut = new CreateUser(repository);

    jest
      .spyOn(UserRepository.prototype, "verifyUserExistsByUsername")
      .mockResolvedValue(false);

    jest
      .spyOn(UserRepository.prototype, "createUser")
      .mockResolvedValue();

      const response = await sut.execute({
        name: "any_name",
        username: "any_username",
        profile: "CANDIDATE",
        company: "any_cia",
        password: "123",
      })

      expect.assertions(6)
      expect(response.id).toBeTruthy()
      expect(response.name).toBe("any_name")
      expect(response.username).toBe("any_username")
      expect(response.profile).toBe("CANDIDATE")
      expect(response.company).toBeUndefined()
      expect(response.password).toBeUndefined()
  })
});
