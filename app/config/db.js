import { Sequelize } from "sequelize";
import { DB_CONFIG } from "./credentials";

export const sequelize = new Sequelize(
  DB_CONFIG.dbName,
  DB_CONFIG.dbUsername,
  DB_CONFIG.dbPassword,
  {
    host: DB_CONFIG.dbHost,
    dialect: "mysql",
    logging: false,
  }
);

export const authenticateDb = async () => {
  try {
    await sequelize.authenticate();
    sequelize.sync({ alter: true });
    console.log("DB connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
