import { NextFunction, Request, Response } from "express";
import { EProfile } from "../../../shared/enums/profile.enum";

export default class CreateUserValidator {
  validate(request: Request, response: Response, next: NextFunction) {
    const { name, password, username, profile, company } = request.body;

    if (!name || name.length < 3) {
      return response.status(400).json({ error: "Nome  inválido" });
    }

    if (!username) {
      return response.status(400).json({ error: "Nome de usuário inválido" });
    }

    if (!password || password.length < 6) {
      return response.status(400).json({ error: "Senha inválida" });
    }

    const validProfile = Object.values(EProfile).some(
      (p) => p === profile?.toUpperCase()
    );

    if (!validProfile) {
      return response.status(400).json({ error: "Perfil inválido." });
    }

    // quando perfil for recrutador, nome da empresa é obrigatório
    if (profile?.toUpperCase() === EProfile.RECRUITER && !company) {
      return response
        .status(400)
        .json({ error: "Nome da empresa obrigatório" });
    }

    return next();
  }
}

// if (
//   profile.toUpperCase() !== "ADMIN" &&
//   profile.toUpperCase() !== "RECRUITER" &&
//   profile.toUpperCase() !== "CANDIDATE"
// ) {
//   return response.status(400).json({ error: "Perfil inválido." });
// }
