import express from "express";
import { validateEventMiddleware } from "../../validators/event.validator";
import controller from "../../controllers/event.controller";

const router = express.Router();

router.route("/").post(validateEventMiddleware, controller.create);

export default router;
