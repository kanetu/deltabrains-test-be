import httpStatus from "http-status";
import APIError from "../errors/api-error";
import { env } from "../../config/vars";
import { NextFunction, Request, Response } from "express";

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
export const handler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const response = {
    code: err.status,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
  };

  if (env !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
export const converter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let convertedError = err;

  if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res, next);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res, next);
};
