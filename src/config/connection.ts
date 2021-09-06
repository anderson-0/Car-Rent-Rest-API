import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";

const dir = env === "development" ? "src" : "dist";
const ext = env === "development" ? "ts" : "js";

console.log(env, dir, ext);

const typeORMConfig: ConnectionOptions = {
  name: "default",
  type: "postgres",
  host: process.env.NODE_ENV === "test" ? "localhost" : "database",
  database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
  port: 5432,
  username: "docker",
  password: "ignite",
  entities: [
    `./${dir}/shared/infra/typeorm/migrations/*.${ext}`,
    `./${dir}/modules/**/infra/typeorm/entities/*.${ext}`,
  ],
  migrations: [`./${dir}/shared/infra/typeorm/migrations/*.${ext}`],
  cli: {
    migrationsDir: `./${dir}/shared/infra/typeorm/migrations/`,
  },
};

export { typeORMConfig };
