import express from "express";
import morgan from "morgan";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import routes from "../api/routes/v1";
import { logs } from "./vars";
import * as error from "../api/middlewares/error";
import cookieParser from "cookie-parser";
const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api v1 routes
app.use("/v1", routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.errorHandler);

export default app;
