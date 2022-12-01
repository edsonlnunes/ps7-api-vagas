import { Request, Response } from "express";
import CreateJob from "../usecases/create-job.usecase";

export default class JobController {
  async createJob(request: Request, response: Response) {
    try {
      const usecase = new CreateJob();

      const result = await usecase.execute({
        ...request.body,
        userId: request.userAuth.userId,
        companyName: request.userAuth.company,
        profile: request.userAuth.profile,
      });

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(500).json({ error: error.message, stack: error });
    }
  }
}
