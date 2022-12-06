import Job from "../../../models/job";
import dataSource from "../../../../main/database/database-connection";
import { JobEntity } from "../../../shared/database/entities/job.entity";
import User from "../../../models/user";
import { CandidateJobEntity } from "../../../shared/database/entities/candidate-job.entity";

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

  async getJobById(id: string): Promise<Job | undefined> {
    const manager = dataSource.manager;

    const jobEntity = await manager.findOne(JobEntity, {
      where: { id },
      relations: [
        "recruiterEntity",
        "inscriptions",
        "inscriptions.candidateEntity",
      ],
    });

    if (!jobEntity) return undefined;

    const candidates = jobEntity.inscriptions
      ? jobEntity.inscriptions.map((inscription) => {
          return new User(
            inscription.candidateEntity?.name!,
            inscription.candidateEntity?.username!,
            inscription.candidateEntity?.profile!,
            undefined,
            inscription.candidateEntity?.id
          );
        })
      : [];

    return new Job(
      jobEntity.description,
      jobEntity.company,
      jobEntity.limitDate,
      new User(
        jobEntity.recruiterEntity?.name!,
        jobEntity.recruiterEntity?.username!,
        jobEntity.recruiterEntity?.profile!,
        jobEntity.recruiterEntity?.company,
        jobEntity.recruiterEntity?.id
      ),
      jobEntity.status,
      jobEntity.maxApplicant,
      jobEntity.id,
      candidates
    );
  }

  async applyToJob(jobId: string, candidateId: string): Promise<void> {
    const manager = dataSource.manager;

    const entity = manager.create(CandidateJobEntity, {
      jobId,
      candidateId,
    });

    await manager.save(entity);
  }
}
