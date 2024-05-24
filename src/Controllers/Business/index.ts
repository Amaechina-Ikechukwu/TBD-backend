import { Request, Response } from "express";
import BusinessInitialization from "../../Services/Business/BusinessRegistration";
import logger from "../../Utils/Logger";

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

  async businessID(req: Request, res: Response) {
    try {
      const business_uid = req.query.business_uid as string;
      const result = await this.businessMethods.getBusinessID(business_uid);
      return result;
    } catch (error: any) {
      logger.error("From create business controller", error);
      throw new Error(error);
    }
  }
  async businessProfile(req: Request, res: Response) {
    try {
      const business_uid = req.query.business_uid as string;
      const result = await this.businessMethods.getBusinessProfile(
        business_uid
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
      const result = await this.businessMethods.registerBusiness(data);
      if (result == "Business name already exist") {
        res.status(403).json({
          result,
        });
        return;
      }
      res.status(200).json({
        result: {
          business_id: data.uid,
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
