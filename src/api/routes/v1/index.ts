import express, { NextFunction, Request, Response } from "express";

import eventRoutes from "./event.route";
import registerRoutes from "./register.route";

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
router.use("/docs", express.static("docs"));

router.use("/events", eventRoutes);
router.use("/register", registerRoutes);

export default router;
