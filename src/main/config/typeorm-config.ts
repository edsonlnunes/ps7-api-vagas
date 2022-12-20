/* eslint-disable n/no-path-concat */
import path from "node:path";
import { DataSourceOptions } from "typeorm";
import envsConfig from "../env/envs-config";

let configTypeorm: DataSourceOptions;

const entities = path.join(
  __dirname,
  "..",
  "..",
  "app",
  "shared",
  "database",
  "entities",
  "*.ts"
);

const migrations = path.join(__dirname, "..", "database", "migrations", "*.ts");

if (process.env.NODE_ENV === "test") {
  configTypeorm = {
    type: "sqlite",
    database: "./test.sqlite",
    synchronize: false,
    logging: false,
    entities: [entities],
    migrations: [migrations],
  };
} else {
  configTypeorm = {
    type: "postgres",
    url: envsConfig.DATABASE_URL,
    synchronize: false,
    logging: false,
    entities: [entities],
    migrations: [migrations],
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

export { configTypeorm };

// export const configTypeorm: DataSourceOptions = {
//   type: "postgres",
//   url: envsConfig.DATABASE_URL,
//   synchronize: false,
//   logging: false,
//   entities: [entities],
//   migrations: [migrations],
//   ssl: {
//     rejectUnauthorized: false,
//   },
// };

// import "dotenv/config";
// import { DataSourceOptions } from "typeorm";
// const config: DataSourceOptions = {
//   type: "postgres",
//   url: process.env.DATABASE_URL,
//   // host: process.env.DB_HOST,
//   // port: process.env.DB_PORT,
//   // username: process.env.DB_USERNAME,
//   // password: process.env.DB_PASSWORD,
//   // database: process.env.DB_DATABASE,
//   synchronize: false,
//   logging: false,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// };
// export default config;
