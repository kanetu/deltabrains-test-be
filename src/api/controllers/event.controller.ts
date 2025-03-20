import { NextFunction, Request, Response } from "express";
import Event from "../models/event.model";
import httpStatus from "http-status";
import { responseHandler } from "../middlewares/response";
import { Op } from "sequelize";

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await Event.create({
      title: req.body.title,
      content: req.body.content,
      venue: req.body.venue,
      date: new Date(req.body.date),
      maxPerson: req.body.maxPerson,
    });
    responseHandler(
      res,
      httpStatus.CREATED,
      true,
      "Create event successfully",
      event
    );
  } catch (error) {
    next(error);
  }
};

const getAllEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const offset = (pageNumber - 1) * pageSize;

    const { rows: events, count: total } = await Event.findAndCountAll({
      where: { ...(search ? { title: { [Op.like]: `%${search}%` } } : {}) },
      limit: pageSize,
      offset: offset,
      order: [["date", "ASC"]],
    });

    responseHandler(res, httpStatus.OK, true, "Get events successfully", {
      events,
      pagination: {
        total,
        page: pageNumber,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    responseHandler(res, httpStatus.OK, true, "Get event successfully", event);
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const event = await Event.findOne({ where: { id } });
    if (!event) {
      responseHandler(
        res,
        httpStatus.NOT_FOUND,
        false,
        `No Event with id: ${id}`
      );
      return;
    }

    const { title, content, venue, date, maxPerson } = req.body;

    await Event.update(
      {
        ...(title ? { title } : {}),
        ...(content ? { content } : {}),
        ...(venue ? { venue } : {}),
        ...(date ? { date: new Date(date) } : {}),
        ...(maxPerson ? { maxPerson } : {}),
      },
      {
        where: { id },
      }
    );

    const updatedEvent = await Event.findByPk(id);

    responseHandler(
      res,
      httpStatus.OK,
      true,
      "Update event successfully",
      updatedEvent
    );
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await Event.destroy({ where: { id } });
    responseHandler(res, httpStatus.OK, true, "Delete event successfully");
  } catch (error) {
    next(error);
  }
};

export default {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvent,
  getEventById,
};
