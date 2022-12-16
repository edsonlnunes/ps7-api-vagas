import JobRepository from "../../../../../src/app/features/jobs/repositories/job.repository";
import UserRepository from "../../../../../src/app/features/jobs/repositories/user.repository";
import ApplyToJob from "../../../../../src/app/features/jobs/usecases/apply-to-job.usecase";
import Job from "../../../../../src/app/models/job";
import User from "../../../../../src/app/models/user";

describe("Testa usecase ApplyToJob", () => {
  test("Deve dar um erro se usuario não for CANDIDATE", () => {
    const userRepository = new UserRepository();
    const jobRepository = new JobRepository();
    const sut = new ApplyToJob(userRepository, jobRepository);

    jest
      .spyOn(userRepository, "findUserById")
      .mockResolvedValue(new User("any_name", "any_username", "ADMIN"));

    sut
      .execute({ jobId: "any_job_id", candidateId: "any_candidateId" })
      .catch((error: any) => {
        expect(error.message).toEqual(
          "Somente candidatos podem se inscrever em uma vaga"
        );
      });
  });

  test("Deve retornar erro de vaga inexistente", () => {
    const userRepository = new UserRepository();
    const jobRepository = new JobRepository();
    const sut = new ApplyToJob(userRepository, jobRepository);

    jest
      .spyOn(userRepository, "findUserById")
      .mockResolvedValue(new User("any_name", "any_username", "CANDIDATE"));

    jest.spyOn(jobRepository, "getJobById").mockResolvedValue(undefined);

    sut
      .execute({ jobId: "any_job_id", candidateId: "any_candidateId" })
      .catch((error: any) => {
        expect(error.message).toEqual("A vaga não foi encontrada");
      });
  });

  test("Deve retornar erro de vaga inativa", async () => {
    const userRepository = new UserRepository();
    const jobRepository = new JobRepository();
    const sut = new ApplyToJob(userRepository, jobRepository);

    jest
      .spyOn(userRepository, "findUserById")
      .mockResolvedValue(new User("any_name", "any_username", "CANDIDATE"));

    jest
      .spyOn(jobRepository, "getJobById")
      .mockResolvedValue(
        new Job(
          "any_description",
          "any_company",
          new Date(),
          new User("any_name", "any_username", "RECRUITER", "any_company"),
          false
        )
      );

    try {
      await sut.execute({
        jobId: "any_job_id",
        candidateId: "any_candidateId",
      });
    } catch (error: any) {
      expect(error.message).toEqual(
        "Vaga não está mais ativa para inscrições."
      );
    }
  });
});
