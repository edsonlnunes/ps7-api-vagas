import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import JobRepository from "../repositories/job.repository";
import ApplyToJob from "../usecases/apply-to-job.usecase";

export default class CandidateController {
  async applyToJob(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const userRepository = new UserRepository();
      const jobRepository = new JobRepository();

      const usecase = new ApplyToJob(userRepository, jobRepository);

      await usecase.execute({
        jobId: id,
        candidateId: request.userAuth.userId,
      });

      return response.status(200).json();
    } catch (error: any) {
      return response.status(500).json({ error: error.message, stack: error });
    }
  }
}
