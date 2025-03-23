import express from "express";
import {
  validateCreateEventMiddleware,
  validateGetAllEventsMiddleware,
  validateRegisterEventMiddleware,
  validateUpdateEventMiddleware,
} from "../../validators/event.validator";
import controller from "../../controllers/event.controller";

const router = express.Router();

router.get("/", validateGetAllEventsMiddleware, controller.getAllEvent);
router.get("/:id", controller.getEventById);
router.post("/", validateCreateEventMiddleware, controller.createEvent);
router.put("/:id", validateUpdateEventMiddleware, controller.updateEvent);
router.delete("/:id", controller.deleteEvent);
router.post(
  "/:id/register",
  validateRegisterEventMiddleware,
  controller.registerEvent
);

export default router;
