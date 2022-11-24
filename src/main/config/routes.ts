import { Express } from "express";

export default (app: Express) => {
  app.get("/", (request, response) => response.status(200).send("API RODANDO"));
};
