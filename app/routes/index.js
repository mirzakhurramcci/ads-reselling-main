import express from "express";
import { generateTestLink, globalPostBack, traffic } from "../controllers/campaign";

const Router = express.Router();

Router.get("/global/postback", globalPostBack);

Router.get("/global/generate_test_link", generateTestLink);

Router.get("/global/traffic",traffic)

module.exports = Router;
