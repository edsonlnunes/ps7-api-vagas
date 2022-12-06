import { EProfile } from "../../../shared/enums/profile.enum";
import JobRepository from "../repositories/job.repository";
import UserRepository from "../repositories/user.repository";
import { differenceInDays } from "date-fns";

interface RequestData {
  jobId: string;
  candidateId: string;
}

// REGRAS DE NEGÓCIO ENVOLVIDAS
// - A data limite da vaga já foi alcançada - OK
// - A vaga não está ativa - OK
// - A vaga já está lotada de candidatos, quando tiver número máximo definido - OK
// - O candidato já se aplicou a mesma vaga - OK
// - O candidato for do tipo “admin” ou “recrutador” - OK
export default class ApplyToJob {
  async execute(data: RequestData): Promise<any> {
    const userRepository = new UserRepository();

    const user = await userRepository.findUserById(data.candidateId);

    if (user.profile !== EProfile.CANDIDATE) {
      throw new Error("Somente candidatos podem se inscrever em uma vaga");
    }

    const jobRepository = new JobRepository();

    const job = await jobRepository.getJobById(data.jobId);

    if (!job) {
      throw new Error("A vaga não foi encontrada");
    }

    if (!job.enable) {
      throw new Error("Vaga não está mais ativa para inscrições.");
    }

    const now = new Date().getTime();

    // pega a data atual e diminui 3 horas por causa do time zone
    const dateNow = new Date(now - 1000 * 60 * 60 * 3);

    // se diferença de dias for negativo, é pq a data limite já passou
    if (differenceInDays(job.deadline, dateNow) < 0) {
      throw new Error("A data limite para inscrição já passou");
    }

    if (job.isFull()) {
      throw new Error("A vaga chegou no limite de candidatos");
    }

    if (job.candidateAlreadyApply(data.candidateId)) {
      throw new Error("O candidato já está inscrito nesta vaga");
    }

    await jobRepository.applyToJob(data.jobId, data.candidateId);
  }
}
