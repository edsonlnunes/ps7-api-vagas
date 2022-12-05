import { NextFunction, Request, Response } from "express";
import { EProfile, ExpProfile } from "../../../shared/enums/profile.enum";

export class IsAdminValidator {
  validate(request: Request, response: Response, next: NextFunction) {
    const profile = request.userAuth.profile.toUpperCase() as ExpProfile;

    if (EProfile.ADMIN !== profile) {
      return response.status(403).json({
        error: "Operação somente válida para usuários administradores",
      });
    }

    next();
  }
}
