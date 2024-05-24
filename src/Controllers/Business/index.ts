import { Request, Response } from "express";
import BusinessInitialization from "../../Services/Business/BusinessRegistration";
import logger from "../../Utils/Logger";
import { generateToken } from "../../Config/createtoken";

class BusinessIndex {
  private readonly businessMethods;
  constructor() {
    this.businessMethods = new BusinessInitialization();
  }

  async doBusinessExist(req: Request, res: Response) {
    try {
      const business_name = req.query.business_name as string;
      const result = await this.businessMethods.doesBusinessExist(
        business_name
      );
      res.status(200).json({
        result,
      });
    } catch (error: any) {
      logger.error("From create business controller", error);
      throw new Error(error);
    }
  }
  async createBusiness(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await this.businessMethods.registerBusiness(
        data,
        data.uid
      );
      if (result == "Business name already exist") {
        res.status(403).json({
          result,
        });
        return;
      }
      const token = generateToken(data);
      res.status(200).json({
        result: {
          token: token,
          result,
        },
      });
    } catch (error: any) {
      logger.error("From create business controller", error);
      throw new Error(error);
    }
  }
}
export default BusinessIndex;
