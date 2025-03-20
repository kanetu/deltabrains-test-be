import express from "express";
import controller from "../../controllers/register.controller";
import { validateRegisterMiddleware } from "../../validators/register.validator";

const router = express.Router();

router.post("/:eventId", validateRegisterMiddleware, controller.register);

export default router;
