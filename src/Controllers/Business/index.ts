import { Request, Response } from "express";
import BusinessInitialization from "../../Services/Business/BusinessRegistration";
import logger from "../../Utils/Logger";

class BusinessIndex {
  private readonly businessMethods;
  constructor() {
    this.businessMethods = new BusinessInitialization();
  }
  async createBusiness(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await this.businessMethods.registerBusiness(
        data,
        req.user_id
      );
      res.status(200).json({ result });
    } catch (error: any) {
      logger.error("From create business controller", error);
      throw new Error(error);
    }
  }
}
export default BusinessIndex;
