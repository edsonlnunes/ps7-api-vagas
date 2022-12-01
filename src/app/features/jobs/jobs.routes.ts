import { Router } from "express";
import TokenValidator from "../../shared/validators/token.validator";
import JobController from "./controller/job.controller";

export default () => {
  const router = Router();

  const jobController = new JobController();

  router.post("/", new TokenValidator().validate, jobController.createJob);

  return router;
};
