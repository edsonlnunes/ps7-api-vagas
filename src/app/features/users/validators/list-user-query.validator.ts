import { NextFunction, Request, Response } from "express";
import { EProfile, ExpProfile } from "../../../shared/enums/profile.enum";

export class ListUserQueryValidator {
  validate(request: Request, response: Response, next: NextFunction) {
    const { profile } = request.query;

    if (!!profile) {
      if (!Object.keys(EProfile).includes((profile as string).toUpperCase()))
        return response.status(401).json({
          error: "Perfil deste tipo não encontrado.",
        });
    }

    next();
  }
}
