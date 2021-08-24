import "reflect-metadata";
import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "./swagger.json";
import { router } from "./routes";

import "./database";

import "./shared/container";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.get("/", (_, response) => {
  return response.json({ ok: true });
});

const port = process.env.PORT || "3333";
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
