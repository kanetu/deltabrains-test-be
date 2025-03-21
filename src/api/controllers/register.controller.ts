import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { responseHandler } from "../middlewares/response";
import { Attendee, Event, AttendeeEvent } from "../models/association";
import sequelize from "../../config/sequelize";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName, gender, email, phoneNumber } = req.body;
    const { eventId } = req.params;

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

    const event = await Event.findByPk(eventId);
    if (!event) {
      await t.rollback();
      responseHandler(
        res,
        httpStatus.BAD_REQUEST,
        false,
        `No Event with id: ${eventId}`
      );
      return;
    }

    const totalAttendee = await Attendee.count({
      include: {
        model: Event,
        where: { id: eventId },
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
  register,
};
