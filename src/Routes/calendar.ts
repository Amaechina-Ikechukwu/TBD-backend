import {
  Router,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import ListOfEvents from "../Controllers/Calendar/Events";
import logger from "../Utils/Logger";
import checkParametersMiddleware from "../Middlewares/checkParametersMiddleware";

class CalendarRouter {
  private readonly router: Router;
  private readonly calendar: ListOfEvents;

  constructor() {
    this.router = Router();
    this.calendar = new ListOfEvents();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      "/events",
      checkParametersMiddleware(["business_id"]),
      this.getEvents.bind(this)
    );
    this.router.post(
      "/events",
      checkParametersMiddleware([
        "summary",
        "description",
        "attendees",
        "start",
        "end",
      ]),
      this.createEvent.bind(this)
    );
    this.router.use(this.errorHandler.bind(this));
  }

  private async getEvents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.calendar.events(req, res);
    } catch (err) {
      next(err);
    }
  }

  private async createEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.calendar.createEvents(req, res);
    } catch (err) {
      next(err);
    }
  }

  private errorHandler(
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    logger.error("From calendar Router", err);
    res.status(500).json({ error: "Something went wrong" });
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default CalendarRouter;
