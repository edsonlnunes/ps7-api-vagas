import { Request, Response } from "express";

export default class JobController {
  createJob(request: Request, response: Response) {
    return response.status(200).json(request.body);
  }
}
