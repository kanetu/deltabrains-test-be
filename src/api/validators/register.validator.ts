import { NextFunction, Request, Response } from "express";

import { z, ZodError } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(1).max(20).nonempty(),
  gender: z.enum(["Anh", "Chi"]),
  email: z.string().email().nonempty(),
  phoneNumber: z
    .string()
    .regex(
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
      "Phone number is invalid"
    )
    .nonempty(),
});

const validateRegisterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    registerSchema.parse(req.body);
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

export { validateRegisterMiddleware };
