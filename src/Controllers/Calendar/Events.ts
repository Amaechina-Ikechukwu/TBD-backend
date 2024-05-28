import { Request, Response } from "express";
import CalendarInitialization from "../../Services/Calendar/IntializeCalendar";
import logger from "../../Utils/Logger";
import EventCreation from "../../Services/Calendar/EventCreation";
import BusinessInitialization from "../../Services/Business/BusinessInitialization";
class Events {
  async events(req: Request, res: Response) {
    try {
      const listOfEvents = new CalendarInitialization();
      const business_id = req.query.business_id as string;
      const { email } = await new BusinessInitialization().getBusinessProfile(
        business_id
      );
      const result = await listOfEvents.initialize(email);
      res.status(200).json({ result });
    } catch (err: any) {
      logger.error("From list of events", err);
      throw new Error(err);
    }
  }
  async createEvents(req: Request, res: Response) {
    try {
      const create = new EventCreation();
      const data = req.body;
      const business_id = req.query.business_id as string;

      await create.createEvent(data, business_id);
      res.status(200).json({ result: "Event Created" });
    } catch (err: any) {
      logger.error("From create events", err);
      throw new Error(err);
    }
  }
}
export default Events;
