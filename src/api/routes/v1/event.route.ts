import express from "express";
import {
  validateCreateEventMiddleware,
  validateGetAllEventsMiddleware,
  validateRegisterEventMiddleware,
  validateUpdateEventMiddleware,
} from "../../validators/event.validator";
import controller from "../../controllers/event.controller";

const router = express.Router();

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Get all events
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The numbers of items to return
 *       - in: query
 *         name: search
 *         schema:
 *            type: string
 *         description: fitler string
 *     responses:
 *       200:
 *         description: Returns list of events
 *
 */
router.get("/", validateGetAllEventsMiddleware, controller.getAllEvent);
/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Get event by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the event
 *     responses:
 *       200:
 *         description: Returns single event
 *
 */
router.get("/:id", controller.getEventById);
/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create new event
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Event"
 *     responses:
 *       201:
 *         description: Create event success
 *
 */
router.post("/", validateCreateEventMiddleware, controller.createEvent);
/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Update event by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the event
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Event"
 *     responses:
 *       200:
 *         description: Update event success
 *
 */
router.put("/:id", validateUpdateEventMiddleware, controller.updateEvent);
/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     summary: Delete event by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the event
 *     responses:
 *       200:
 *         description: Delete event success
 *
 */
router.delete("/:id", controller.deleteEvent);
/**
 * @openapi
 * /events/{id}/register:
 *   post:
 *     summary: Register event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the event
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Attendee"
 *     responses:
 *       200:
 *         description: Register event success
 *
 */
router.post(
  "/:id/register",
  validateRegisterEventMiddleware,
  controller.registerEvent
);

export default router;
