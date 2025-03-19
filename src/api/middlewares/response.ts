import { Response } from "express";

export const responseHandler = (
  res: Response,
  status: number,
  success: boolean,
  message: string,
  data: any = null
) => {
  return res.status(status).json({ success, message, data });
};
