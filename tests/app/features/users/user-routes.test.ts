import supertest from "supertest";
import dataSource from "../../../../src/main/database/database-connection";
import app from "../../../../src/main/config/app";

describe("Testa rota de usuário", () => {
  beforeAll(async () => {
    await dataSource.initialize();
    console.log("===ENV===", process.env.NODE_ENV);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  test("Deve dar erro por não passar o token", async () => {
    const response = await supertest(app).get("/users");
    console.log("==Response==", response);

    expect(response.status).toBe(402);
  });
});
