import { Attendee } from "./attendee.model";
import { AttendeeEvent } from "./attendeeEvent.model";
import { Event } from "./event.model";

Event.belongsToMany(Attendee, { through: AttendeeEvent });
Attendee.belongsToMany(Event, { through: AttendeeEvent });

export { Event, Attendee, AttendeeEvent };
