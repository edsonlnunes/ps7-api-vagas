import Job from "../../../models/job";
import { EProfile } from "../../../shared/enums/profile.enum";
import JobRepository from "../repositories/job.repository";
import UserRepository from "../repositories/user.repository";

interface RequestData {
  description: string;
  deadline: Date;
  maxCandidates?: number;
  userId: string;
}

// somente usuarios do perfil recrutador podem criar vagas
export default class CreateJob {
  async execute(data: RequestData): Promise<any> {
    const userRepository = new UserRepository();

    const user = await userRepository.findUserById(data.userId);

    // validar se o usuãrio que está criando é do perfil recrutador
    if (user.profile !== EProfile.RECRUITER) {
      throw new Error("Somente usuário perfil Recrutador pode criar uma vaga");
    }

    const job = new Job(
      data.description,
      user.company!,
      data.deadline,
      user,
      true,
      data.maxCandidates
    );

    // salvar a vaga no banco de dados
    const repository = new JobRepository();

    await repository.createJob(job);

    // retornar os dados da vaga criada
    return job.toJson();
  }
}
