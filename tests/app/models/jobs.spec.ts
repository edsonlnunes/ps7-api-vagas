import Job from "../../../src/app/models/job";
import User from "../../../src/app/models/user";

describe("Testes model jobs", () => {
  test("Testa a criação de um novo job", () => {
    const today = new Date();
    const user = new User("joao", "joaosilva", "RECRUITER", "Growdev");
    const sut = new Job("description", "company", today, user, true);
    expect(sut.description).toBe("description");
    expect(sut.company).toBe("company");
    expect(sut.deadline).toBe(today);
    expect(sut.deadline).toBeInstanceOf(Date);
    expect(sut.recruiter).toEqual(user);
    expect(sut.recruiter).toBeInstanceOf(User);
    expect(sut.recruiter.profile).toBe("RECRUITER");
    expect(sut.enable).toBe(true);
  });

  test("Testar a criação de um novo job com todas informações", () => {
    const today = new Date();
    const recruiterUser = new User("joao", "joaosilva", "RECRUITER", "Growdev");
    const candidateUser = new User("joao", "joaosilva", "CANDIDATE", "Growdev");
    const sut = new Job(
      "description",
      "company",
      today,
      recruiterUser,
      true,
      10,
      "id",
      [candidateUser]
    );
    expect(sut.maxCandidates).toBe(10);
    expect(sut.id).toBe("id");
    expect(sut.candidates).toHaveLength(1);
    expect(sut.candidates[0]).toEqual(candidateUser);
  });

  test("Testar o erro quando o Usuario não é Candidate", () => {
    const today = new Date();
    const recruiterUser = new User("joao", "joaosilva", "RECRUITER", "Growdev");
    expect(
      () =>
        new Job(
          "description",
          "company",
          today,
          recruiterUser,
          true,
          10,
          "id",
          [recruiterUser]
        )
    ).toThrowError();
  });

  test("testar metodo toJson", () => {
    const today = new Date();
    const recruiterUser = new User("joao", "joaosilva", "RECRUITER", "Growdev");
    const candidateUser = new User("joao", "joaosilva", "CANDIDATE", "Growdev");
    const sut = new Job(
      "description",
      "comgrowdevpany",
      today,
      recruiterUser,
      true,
      10,
      "id",
      [candidateUser]
    );
    expect(sut.toJson()).toHaveProperty("id");
    expect(sut.toJson()).toHaveProperty("description");
    expect(sut.toJson()).toHaveProperty("company", "comgrowdevpany");
    expect(sut.toJson()).toHaveProperty("enable", true);
    expect(sut.toJson()).toHaveProperty("deadline", today);
    expect(sut.toJson()).toHaveProperty("maxCandidates", sut.maxCandidates);
    expect(sut.toJson()).toHaveProperty("recruiter", recruiterUser.toJson());
  });

  test("testar metodo isFull", () => {
    const today = new Date();
    const recruiterUser = new User("joao", "joaosilva", "RECRUITER", "Growdev");
    const candidateUser = new User("joao", "joaosilva", "CANDIDATE", "Growdev");
    const sut = new Job(
      "description",
      "comgrowdevpany",
      today,
      recruiterUser,
      true,
      10,
      "id",
      [candidateUser]
    );
    expect(sut.isFull()).toBeFalsy();
    const sutSegundo = new Job(
      "description",
      "comgrowdevpany",
      today,
      recruiterUser,
      true,
      1,
      "id",
      [candidateUser]
    );
    expect(sutSegundo.isFull()).toBeTruthy();
    const sutTerceiro = new Job(
      "description",
      "comgrowdevpany",
      today,
      recruiterUser,
      true
    );
    expect(sutTerceiro.isFull()).toBeFalsy();
  });

  test("testar metodo candidateAlreadyApply", () => {
    const today = new Date();
    const recruiterUser = new User("joao", "joaosilva", "RECRUITER", "Growdev");
    const candidateUser = new User("joao", "joaosilva", "CANDIDATE", "Growdev");
    const sut = new Job(
      "description",
      "comgrowdevpany",
      today,
      recruiterUser,
      true,
      10,
      "id",
      [candidateUser]
    );
    expect(sut.candidateAlreadyApply(candidateUser.id)).toBeTruthy();
    expect(sut.candidateAlreadyApply(recruiterUser.id)).toBeFalsy();
  });
});
