import { Request, Response } from "express";
import ApplyToJob from "../usecases/apply-to-job.usecase";

export default class CandidateController {
  async applyToJob(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const usecase = new ApplyToJob();

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
