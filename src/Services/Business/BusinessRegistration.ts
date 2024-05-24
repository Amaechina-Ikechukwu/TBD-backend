import { getFirestore } from "firebase-admin/firestore";
import { CreateBusinessInterface } from "../../Interfaces/businessinterface";

class BusinessInitialization {
  private readonly database;
  private readonly businessRef;
  constructor() {
    this.database = getFirestore();
    this.businessRef = this.database.collection("businesses");
  }
  async doesBusinessExist(business_name: string): Promise<boolean | void> {
    try {
      const queryBusinessName = await this.businessRef
        .where("business_name", "==", business_name)
        .get();
      if (queryBusinessName.empty) {
        return false;
      }
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async registerBusiness(
    business: CreateBusinessInterface,
    user_id: string
  ): Promise<string> {
    try {
      const businessExist = await this.doesBusinessExist(
        business.business_name
      );
      if (businessExist) {
        return "Business name already exist";
      }

      await this.businessRef.doc(user_id).set({
        ...business,
      });
      return "Business added";
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
export default BusinessInitialization;
