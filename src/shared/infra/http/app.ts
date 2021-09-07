import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import "@shared/container";
import upload from "@config/upload";
import { AppError } from "@shared/errors/AppError";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";
import "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

const app = express();
app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(router);

app.get("/", (_, response) => {
  return response.json({ ok: true });
});

app.use(Sentry.Handlers.errorHandler());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal Server Error: ${err.message}`,
  });
});

export { app };
