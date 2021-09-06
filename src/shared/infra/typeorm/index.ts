import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const isTestEnv = process.env.NODE_ENV === "test";

  return createConnection(
    Object.assign(defaultOptions, {
      database: isTestEnv ? "rentx_test" : defaultOptions.database,
    })
  );
};
