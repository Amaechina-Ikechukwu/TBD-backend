import { google } from "googleapis";
import { CreateEvent } from "../../Interfaces/calendarInterfaces";
import CalendarInitialization from "./IntializeCalendar";
import logger from "../../Utils/Logger";
import BusinessInitialization from "../Business/BusinessInitialization";

class EventCreation {
  async createEvent(data: CreateEvent, business_id: string) {
    try {
      const business_information = new BusinessInitialization();
      const { email } = await business_information.getBusinessProfile(
        business_id
      );
      //Getting the auth from CalendarInitialization folder
      const authorizeCalendar = new CalendarInitialization();
      const auth = await authorizeCalendar.authorize();
      const calendar = google.calendar({ version: "v3", auth });

      const response = await calendar.events.insert({
        calendarId: email,

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
