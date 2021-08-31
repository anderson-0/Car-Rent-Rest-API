import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "is_admin", created_at, driver_license )
        values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  describe("SHOULD", () => {
    it("Create new category", async () => {
      const responseToken = await request(app).post("/sessions").send({
        email: "admin@rentx.com",
        password: "admin",
      });

      const { token } = responseToken.body;

      const response = await request(app)
        .post("/categories")
        .send({
          name: "Category Super Test",
          description: "Category Super Test",
        })
        .set({
          Authorization: `Bearer ${token}`,
        });

      expect(response.status).toBe(201);
    });
  });

  describe("SHOULD NOT", () => {
    it("Create new Category with duplicated name", async () => {
      const responseToken = await request(app).post("/sessions").send({
        email: "admin@rentx.com",
        password: "admin",
      });

      const { token } = responseToken.body;

      const response = await request(app)
        .post("/categories")
        .send({
          name: "Category Super Test",
          description: "Category Super Test",
        })
        .set({
          Authorization: `Bearer ${token}`,
        });

      expect(response.status).toBe(400);
    });
  });
});
