import { getFirestore } from "firebase-admin/firestore";
import { BusinessInterface } from "../../Interfaces/businessinterface";
import logger from "../../Utils/Logger";

class BusinessInitialization {
  private readonly database;
  private readonly businessRef;
  constructor() {
    this.database = getFirestore();
    this.businessRef = this.database.collection("business");
  }
  async doesBusinessExist(business_name: string): Promise<boolean> {
    try {
      const queryBusinessName = await this.businessRef
        .where("business_name" == business_name)
        .get();
      if (queryBusinessName.empty) {
        return false;
      }
      return true;
    } catch (error) {
      logger.error("From Register Business", error);
      return true;
    }
  }
  async registerBusiness(
    business: BusinessInterface,
    user_id: string
  ): Promise<string> {
    try {
      const businessExist = await this.doesBusinessExist(
        business.business_name
      );
      if (businessExist) {
        return "Business name already exist";
      }
      await this.businessRef.doc(user_id).set({ ...business });
      return "Business added";
    } catch (error) {
      logger.error("From Register Business", error);
      return "Failed to register business";
    }
  }
}
export default BusinessInitialization;
