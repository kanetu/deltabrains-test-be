import path from "path";
// import .env variables
import dotenvSafe from "dotenv-safe";

dotenvSafe.config({
  path: path.join(__dirname, "../../.env"),
  example: path.join(__dirname, "../../.env.example"),
});

const env = process.env.NODE_ENV;
const port = process.env.PORT;
const mongo = {
  uri:
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_URI_TESTS
      : process.env.MONGO_URI,
};
const logs = process.env.NODE_ENV === "production" ? "combined" : "dev";

const dbCredentials = {
  HOST: process.env.MYSQL_HOST,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MYSQL_DB,
  dialect: "mysql",
  pool: {
    max: Number(process.env.MYSQL_POOL_MAX),
    min: Number(process.env.MYSQL_POOL_MIN),
    acquire: Number(process.env.MYSQL_POOL_ACCQUIRE),
    idle: Number(process.env.MYSQL_POOL_IDLE),
  },
};
export { env, port, mongo, logs, dbCredentials };
