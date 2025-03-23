import express, { NextFunction, Request, Response } from "express";

import docsRoutes from "./docs.route";
import eventRoutes from "./event.route";

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req: Request, res: Response, next: NextFunction) => {
  res.json({ status: "Working" });
});

/**
 * GET v1/docs
 */
router.use("/docs", docsRoutes);

router.use("/events", eventRoutes);

export default router;
