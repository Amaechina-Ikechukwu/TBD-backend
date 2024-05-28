import { Request, Response } from "express";
import BusinessInitialization from "../../Services/Business/BusinessInitialization";
import logger from "../../Utils/Logger";
import { generateToken } from "../../Config/createtoken";
import { getAuth } from "firebase-admin/auth";

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

  public async createToken(req: Request, res: Response): Promise<void> {
    try {
      const userRecord = await getAuth().getUser(req.body.uid);

      if (!userRecord) {
        res.status(403).json({
          result: "Not valid user credentials",
        });
      }

      const token = generateToken(req.body);
      res.status(200).json({
        result: token,
      });
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        res.status(403).json({
          result: "Not valid user credentials",
        });
      } else {
        logger.error("From create business controller", error.message);
        res.status(500).json({
          error: "An error occurred while creating the token",
          details: error.message,
        });
      }
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

  async updateBusiness(req: any, res: Response) {
    try {
      const data = req.body;
      const result = await this.businessMethods.updateBusinessProfile(
        data,
        req.user_id
      );
      if (result == "Business does not exist") {
        res.status(403).json({
          result,
        });
        return;
      }
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
      if (
        result == "Business name already exist" ||
        result == "Business Id already exists"
      ) {
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
