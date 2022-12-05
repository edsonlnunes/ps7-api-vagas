import Job from "../../../models/job";
import dataSource from "../../../../main/database/database-connection";
import { JobEntity } from "../../../shared/database/entities/job.entity";

export default class JobRepository {
  async createJob(job: Job): Promise<void> {
    const manager = dataSource.manager;

    const jobEntity = manager.create(JobEntity, {
      id: job.id,
      description: job.description,
      company: job.company,
      limitDate: job.deadline,
      maxApplicant: job.maxCandidates,
      recruiterId: job.recruiter.id,
      status: job.enable,
    });

    await manager.save(jobEntity);
  }
}
