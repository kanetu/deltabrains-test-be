import express from "express";
import { validateEventMiddleware } from "../../validators/event.validator";

// const controller = require("../../controllers/user.controller");

const router = express.Router();

router.route("/").post(validateEventMiddleware);

export default router;
