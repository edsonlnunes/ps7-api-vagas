import { Router } from "express";
import JobController from "./controller/job.controller";

export default () => {
  const router = Router();

  const jobController = new JobController();

  router.post("/", jobController.createJob);

  return router;
};
