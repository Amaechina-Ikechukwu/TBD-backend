import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import BusinessIndex from "../Controllers/Business";
import logger from "../Utils/Logger";
import checkParametersMiddleware from "../Middlewares/checkParametersMiddleware";

class BusinessRouter {
  private readonly router: Router;
  private readonly business: BusinessIndex;
  constructor() {
    this.router = Router();
    this.business = new BusinessIndex();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get(
      "/exists",
      checkParametersMiddleware(["business_name"]),
      this.checkIfBusinessNameExist.bind(this)
    );
    this.router.get(
      "/profile",
      checkParametersMiddleware(["business_uid"]),
      this.getBusinessInformation.bind(this)
    );
    this.router.post(
      "/profile",
      checkParametersMiddleware([
        "uid",
        "email",
        "photoURL",
        "emailVerified",
        "phoneNumber",
        "isAnonymous",
        "tenantId",
        "providerData",
        "business_name",
        "business_description",
        "business_bank_name",
        "business_bank_account_number",
        "business_bank_account_name",
        "business_facebook_link",
        "business_instagram_link",
        "business_twitter_link",
        "business_phone_number",
      ]),
      this.createBusiness.bind(this)
    );
    this.router.use(this.errorHandler.bind(this));
  }
  private async getBusinessInformation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.business.businessProfile(req, res);
    } catch (error) {
      next(error);
    }
  }
  private async checkIfBusinessNameExist(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.business.doBusinessExist(req, res);
    } catch (error) {
      next(error);
    }
  }
  private async createBusiness(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.business.createBusiness(req, res);
    } catch (error) {
      next(error);
    }
  }
  private errorHandler(
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    logger.error("From business router", error);
    res.status(500).json({ error: "Something went wrong" });
  }
  public getRouter(): Router {
    return this.router;
  }
}
export default BusinessRouter;
