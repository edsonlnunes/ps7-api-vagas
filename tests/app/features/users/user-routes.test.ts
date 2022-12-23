import supertest from "supertest";
import dataSource from "../../../../src/main/database/database-connection";
import app from "../../../../src/main/config/app";
import User from "../../../../src/app/models/user";
import { sign } from "jsonwebtoken";
import envsConfig from "../../../../src/main/env/envs-config";
import { RedisConnection } from "../../../../src/main/database/redis-connection";
import { CacheRepository } from "../../../../src/app/shared/database/cache-repositories/cache.repositoy";

jest.mock("ioredis", () => require("ioredis-mock"));

describe("Testa rota de usuário", () => {
  beforeAll(async () => {
    await dataSource.initialize();
    RedisConnection.connect();
  });

  afterAll(async () => {
    await dataSource.destroy();
    RedisConnection.destroy();
  });

  test.skip("Deve dar erro por não passar o token", async () => {
    const response = await supertest(app).get("/users");

    expect(response.status).toBe(401);
  });

  test.skip("Deve dar erro por passar um token inválido", async () => {
    const user = new User("name", "username", "ADMIN");
    const payloadToken = {
      userId: user.id,
      company: user.company,
      profile: user.profile,
    };

    const token = sign(payloadToken, "Kelly", {
      expiresIn: envsConfig.EXPIRE_IN,
    });

    const response = await supertest(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual({ error: "Usuário não autenticado." });
  });

  test.skip("Deve retornar um erro de perfil diferente de ADMIN", async () => {
    const user = new User("name", "username", "CANDIDATE");
    const payloadToken = {
      userId: user.id,
      company: user.company,
      profile: user.profile,
    };

    const token = sign(payloadToken, envsConfig.SECRET_TOKEN!, {
      expiresIn: envsConfig.EXPIRE_IN,
    });

    const response = await supertest(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      error: "Operação somente válida para usuários administradores",
    });
  });

  test.skip("Deve retornar erro de perfil inválido", async () => {
    const user = new User("name", "username", "ADMIN");
    const payloadToken = {
      userId: user.id,
      company: user.company,
      profile: user.profile,
    };

    const token = sign(payloadToken, envsConfig.SECRET_TOKEN!, {
      expiresIn: envsConfig.EXPIRE_IN,
    });

    const response = await supertest(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .query({ profile: "Fabio" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: "Perfil deste tipo não encontrado.",
    });
  });

  test.skip("Deve retornar lista de usuários", async () => {
    const user = new User("name", "username", "ADMIN");
    const payloadToken = {
      userId: user.id,
      company: user.company,
      profile: user.profile,
    };

    const token = sign(payloadToken, envsConfig.SECRET_TOKEN!, {
      expiresIn: envsConfig.EXPIRE_IN,
    });

    const response = await supertest(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .query({ profile: "ADMIN" });

    console.log("==Response.body==", response.body);

    expect(response.status).toBe(200);
    // expect(response.body).toEqual({ error: "Perfil deste tipo não encontrado."});
  });

  test("testar o cache", async () => {
    const cacheRepository = new CacheRepository;

    const user = new User("name", "username", "ADMIN");

    const payloadToken = {
      userId: user.id,
      company: user.company,
      profile: user.profile,
    };

    const token = sign(payloadToken, envsConfig.SECRET_TOKEN!, {
      expiresIn: envsConfig.EXPIRE_IN,
    });

    await cacheRepository.set(
      "users", [user]
    )

    const response = await supertest(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    // expect(JSON.parse(response.body)).toHaveLength(1);
    expect(response.body).toHaveLength(1);
  })
});
