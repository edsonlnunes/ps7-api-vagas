import Job from "../../../models/job";
import JobRepository from "../repositories/job.repository";

export default class ListJobs {
  async execute(): Promise<Job[]> {
    const jobRepository = new JobRepository();

    const list = await jobRepository.findJobs();

    return list;
  }
}
