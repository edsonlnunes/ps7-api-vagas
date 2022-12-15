import User from "../../../src/app/models/user";

describe.skip("Testes model Usuário", () => {
  test("Testa a criação de um novo usuário ADMIN", () => {
    const sut = new User("joao", "joaosilva", "ADMIN");

    expect(sut.name).toBe("joao");
    expect(sut.username).toBe("joaosilva");
    expect(sut.profile).toBe("ADMIN");
    expect(sut).toBeInstanceOf(User);
  });

  test("Testa a criação de usuário do tipo RECUITER", () => {
    const sut = new User("Joao", "joaoSilva", "RECRUITER", "Growdev");

    expect(sut.profile).toBe("RECRUITER");
    expect(sut.company).toEqual("Growdev");
  });

  test("Testar a recosntrução do usuário", () => {
    const sut1 = new User("user", "userUser", "CANDIDATE");
    const sut2 = new User(
      sut1.name,
      sut1.username,
      sut1.profile,
      sut1.company,
      sut1.id,
      sut1.password
    );

    expect(sut2).toEqual(sut1);
  });

  test("Testar erro quando o recruiter não possui company", () => {
    expect(() => new User("user", "userUser", "RECRUITER")).toThrowError(
      new Error("Usuário inválido")
    );
  });

  test("Testar remoção do password", () => {
    const sut = new User(
      "user",
      "userUser",
      "CANDIDATE",
      "xpto",
      "123456789654",
      "123456789"
    );

    expect(sut.password).toBeTruthy();
    sut.removePassword();
    expect(sut.password).toBeFalsy();
  });

  test("Testa toJson", () => {
    const sut = new User(
      "user",
      "userUser",
      "CANDIDATE",
      "xpto",
      "123456789654",
      "123456789"
    );

    sut.removePassword();
    expect(sut.toJson()).toHaveProperty("id");
    expect(sut.toJson()).toHaveProperty("name", "user");
    expect(sut.toJson()).toHaveProperty("username", sut.username);
    expect(sut.toJson()).toHaveProperty("profile");
    expect(sut.toJson()).toHaveProperty("company");
  });
});
