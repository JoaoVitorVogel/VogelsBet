import "reflect-metadata";
import "module-alias/register";
import express, { json, urlencoded } from "express";
import "express-async-errors";
import cors from "cors";
import { createServer } from "http";
import { router } from "./routes";
import "../container";
import { errorHandler } from "../../utils/errorHandler";

const app = express();

const expressParserLimit = "50mb";

app.use(
  json({ limit: expressParserLimit }),
  urlencoded({ limit: expressParserLimit, extended: true })
);

app.use(cors(), router);

app.use(errorHandler);

export { app };
