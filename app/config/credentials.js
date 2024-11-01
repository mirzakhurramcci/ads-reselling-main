if (!process.NODE_ENV) require("dotenv").config();

export const SERVER_PORT = process.env.SERVER_PORT;

export const DB_CONFIG = {
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
};
