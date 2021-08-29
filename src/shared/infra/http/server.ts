import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";

import "@shared/container";

import { AppError } from "@shared/errors/AppError";
import swaggerFile from "../../../swagger.json";

import createConnection from "@shared/infra/typeorm";

import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.get("/", (_, response) => {
  return response.json({ ok: true });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal Server Error: ${err.message}`,
  });
});

const port = process.env.PORT || "3333";
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
