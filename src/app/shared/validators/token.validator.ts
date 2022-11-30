import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import envsConfig from "../../../main/env/envs-config";

export default class TokenValidator {
  validate(request: Request, response: Response, next: NextFunction) {
    const token = request.headers?.authorization;

    if (!token) {
      return response.status(400).json({ error: "Autenticação necessária." });
    }

    try {
      const payload = verify(token.split(" ")[1], envsConfig.SECRET_TOKEN!);
    } catch (error) {
      response.status(401).json({ error: "Usuário não autenticado." });
    }

    return next();
  }
}
