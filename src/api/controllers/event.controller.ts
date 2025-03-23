import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { responseHandler } from "../middlewares/response";
import { Op, Sequelize } from "sequelize";
import { Attendee, AttendeeEvent, Event } from "../models/association";
import sequelize from "../../config/sequelize";

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
    const { page = 0, limit = 10, search = "" } = req.query;
    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const offset = pageNumber * pageSize;

    const { rows: events, count: total } = await Event.findAndCountAll({
      where: { ...(search ? { title: { [Op.like]: `%${search}%` } } : {}) },
      limit: pageSize,
      offset: offset,
      order: [
        ["date", "DESC"],
        ["updatedAt", "DESC"],
      ],
      include: [
        {
          model: Attendee,
          attributes: [],
          through: { attributes: [] },
          required: false,
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(
              `(SELECT COUNT(*) FROM \`AttendeeEvents\` WHERE \`AttendeeEvents\`.\`eventId\` = \`Event\`.\`id\`)`
            ),
            "attendeeCount",
          ],
        ],
      },
      distinct: true,
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
    const event = await Event.findByPk(id, {
      include: [
        {
          model: Attendee,
          attributes: [],
          through: { attributes: [] },
          required: false,
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(
              `(SELECT COUNT(*) FROM \`AttendeeEvents\` WHERE \`AttendeeEvents\`.\`eventId\` = \`Event\`.\`id\`)`
            ),
            "attendeeCount",
          ],
        ],
      },
    });
    if (!event) {
      responseHandler(
        res,
        httpStatus.NOT_FOUND,
        false,
        `No Event with id: ${id}`
      );
      return;
    }
    responseHandler(res, httpStatus.OK, true, "Get event successfully", event);
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);
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

    const totalAttendee = await Attendee.count({
      include: {
        model: Event,
        where: { id },
      },
    });

    if (totalAttendee > maxPerson) {
      responseHandler(
        res,
        httpStatus.BAD_REQUEST,
        false,
        `Can not update for this event since total attendee currently exceeds the current max person`
      );
      return;
    }

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

const registerEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, gender, email, phoneNumber } = req.body;
    const { id } = req.params;

    const emailExisted = await Attendee.findOne({ where: { email } });

    if (emailExisted?.dataValues) {
      responseHandler(
        res,
        httpStatus.BAD_REQUEST,
        false,
        `Email is registered: ${email}`
      );
      return;
    }

    const phoneNumberExisted = await Attendee.findOne({
      where: { phoneNumber },
    });

    if (phoneNumberExisted?.dataValues) {
      responseHandler(
        res,
        httpStatus.BAD_REQUEST,
        false,
        `Phone number is registered: ${phoneNumber}`
      );
      return;
    }

    const t = await sequelize.transaction();

    const attendee = await Attendee.create(
      {
        fullName,
        gender,
        email,
        phoneNumber,
      },
      { transaction: t }
    );

    const event = await Event.findByPk(id);
    if (!event) {
      await t.rollback();
      responseHandler(
        res,
        httpStatus.BAD_REQUEST,
        false,
        `No Event with id: ${id}`
      );
      return;
    }

    const totalAttendee = await Attendee.count({
      include: {
        model: Event,
        where: { id: id },
        attributes: [],
      },
    });

    if (totalAttendee > event.dataValues.maxPerson) {
      await t.rollback();
      responseHandler(
        res,
        httpStatus.BAD_REQUEST,
        false,
        `This Event is full ${totalAttendee}/${event.dataValues.maxPerson}`
      );
      return;
    }

    await t.commit();

    await AttendeeEvent.create({
      AttendeeId: attendee.dataValues.id,
      EventId: event.dataValues.id,
    });

    responseHandler(
      res,
      httpStatus.CREATED,
      true,
      "Register successfully",
      attendee
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvent,
  getEventById,
  registerEvent,
};
