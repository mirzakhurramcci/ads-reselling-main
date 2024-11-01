import express from "express";
import morgan from "morgan";
import { SERVER_PORT } from "./config/credentials";
import { authenticateDb } from "./config/db";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(require("./routes"));

app.use((err, req, res, next) => {
  console.log(`--------------------Error Logging-------------------------`);
  console.log("\n%o", err);
  console.log("Request Body\n%o", req.body);
  console.log(`-----------------------Loging End--------------------------`);
  const response = { message: err.message, responseCode: err.responseCode };
  res.json(response);
});

app.listen(SERVER_PORT, () => {
  console.log(`Server has started on port: ${SERVER_PORT}`);
  authenticateDb();
});
