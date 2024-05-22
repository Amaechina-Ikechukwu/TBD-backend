import { Request, Response } from "express";
import CalendarInitialization from "../../Services/Calendar/IntializeCalendar";
import logger from "../../Utils/Logger";
class ListOfEvents {
  async events(req: Request, res: Response) {
    try {
      const listOfEvents = new CalendarInitialization();
      listOfEvents.authorize();
      res.status(200).send({ message: "done" });
    } catch (err) {
      logger.error("From list of events", err);
      console.log(err);
    }
  }
}
export default ListOfEvents;
