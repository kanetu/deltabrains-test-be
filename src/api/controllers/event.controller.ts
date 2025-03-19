import { NextFunction, Request, Response } from "express";
import Event from "../models/event.model";
import httpStatus from "http-status";
import { responseHandler } from "../middlewares/response";

const create = async (req: Request, res: Response, next: NextFunction) => {
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

export default { create };

// /**
//  * Replace existing user
//  * @public
//  */
// exports.replace = async (req, res, next) => {
//   try {
//     const { user } = req.locals;
//     const newUser = new User(req.body);
//     const ommitRole = user.role !== 'admin' ? 'role' : '';
//     const newUserObject = omit(newUser.toObject(), '_id', ommitRole);

//     await user.updateOne(newUserObject, { override: true, upsert: true });
//     const savedUser = await User.findById(user._id);

//     res.json(savedUser.transform());
//   } catch (error) {
//     next(User.checkDuplicateEmail(error));
//   }
// };

// /**
//  * Update existing user
//  * @public
//  */
// exports.update = (req, res, next) => {
//   const ommitRole = req.locals.user.role !== 'admin' ? 'role' : '';
//   const updatedUser = omit(req.body, ommitRole);
//   const user = Object.assign(req.locals.user, updatedUser);

//   user.save()
//     .then((savedUser) => res.json(savedUser.transform()))
//     .catch((e) => next(User.checkDuplicateEmail(e)));
// };

// /**
//  * Get user list
//  * @public
//  */
// exports.list = async (req, res, next) => {
//   try {
//     const users = await User.list(req.query);
//     const transformedUsers = users.map((user) => user.transform());
//     res.json(transformedUsers);
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Delete user
//  * @public
//  */
// exports.remove = (req, res, next) => {
//   const { user } = req.locals;

//   user.remove()
//     .then(() => res.status(httpStatus.NO_CONTENT).end())
//     .catch((e) => next(e));
// };
