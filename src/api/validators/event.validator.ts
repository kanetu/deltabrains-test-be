import { NextFunction, Request, Response } from "express";

import { z, ZodError } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1).max(100).nonempty(),
  content: z.string().min(1).max(500).nonempty(),
  venue: z.string().min(1).max(200).nonempty(),
  date: z.coerce.date().refine((value) => new Date(value) >= new Date(), {
    message: "The date must be after today",
  }),
  maxPerson: z.number().int().min(1).max(100),
});

export const updateEventSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  content: z.string().min(1).max(500).optional(),
  venue: z.string().min(1).max(200).optional(),
  date: z.coerce
    .date()
    .refine((value) => new Date(value) >= new Date(), {
      message: "The date must be after today",
    })
    .optional(),
  maxPerson: z.number().int().min(1).max(100).optional(),
});

export const getAllEventsSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  search: z.string().optional(),
});

const validateUpdateEventMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    updateEventSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        status: "Validation Error",
        errors: error.errors,
      });
    } else {
      res.json({
        status: "Unexpected Error",
        error: error,
      });
    }
  }
};

const validateCreateEventMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    createEventSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        status: "Validation Error",
        errors: error.errors,
      });
    } else {
      res.json({
        status: "Unexpected Error",
        error: error,
      });
    }
  }
};

const validateGetAllEventsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    getAllEventsSchema.parse(req.query);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        status: "Validation Error",
        errors: error.errors,
      });
    } else {
      res.json({
        status: "Unexpected Error",
        error: error,
      });
    }
  }
};

export {
  validateCreateEventMiddleware,
  validateUpdateEventMiddleware,
  validateGetAllEventsMiddleware,
};
