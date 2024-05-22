import {
  Router,
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import ListOfEvents from "../Controllers/Calendar/listofevents";
import logger from "../Utils/Logger";

const calendarRouter = Router();
const calendar = new ListOfEvents();
calendarRouter.get(
  "/listofevents",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      calendar.events(req, res);
    } catch (err) {
      next(err);
    }
  }
);

calendarRouter.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.error("From calendar Router", err);
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ error: "Something went wrong" });
  }
);
export default calendarRouter;
