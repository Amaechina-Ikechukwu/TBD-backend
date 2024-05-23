import { google } from "googleapis";
import { CreateEvent } from "../../Interfaces/calendarInterfaces";
import CalendarInitialization from "./IntializeCalendar";
import logger from "../../Utils/Logger";

class EventCreation {
  async createEvent(data: CreateEvent) {
    try {
      //Getting the auth from CalendarInitialization folder
      const authorizeCalendar = new CalendarInitialization();
      const auth = await authorizeCalendar.authorize();
      const calendar = google.calendar({ version: "v3", auth });

      const response = await calendar.events.insert({
        calendarId: "primary",

        requestBody: data,
      });
      return response;
    } catch (err: any) {
      logger.error("Event creation", err);
      throw new Error(err);
    }
  }
}

export default EventCreation;
