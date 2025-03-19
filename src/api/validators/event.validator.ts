import { NextFunction, Request, Response } from "express";
import Event from "../models/event.model";
import { ValidationError } from "sequelize";

const validateEventMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Event.build(req.body);
    await data.validate();
    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      res.json({
        status: "Validate Error",
        error: error.errors.map((e) => e.message),
      });
    } else {
      res.json({
        status: "Unexpected Error",
        error: error,
      });
    }
  }
};

export { validateEventMiddleware };
