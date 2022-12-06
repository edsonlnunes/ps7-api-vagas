import { Router } from "express";
import TokenValidator from "../../shared/validators/token.validator";
import CandidateController from "./controller/candidate.controller";
import JobController from "./controller/job.controller";

export default () => {
  const router = Router();

  router.use(new TokenValidator().validate);

  const jobController = new JobController();
  const candidateController = new CandidateController();

  router.post("/", jobController.createJob);

  router.post("/:id/apply", candidateController.applyToJob);

  return router;
};
