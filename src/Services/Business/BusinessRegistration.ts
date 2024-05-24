import { QueryDocumentSnapshot, getFirestore } from "firebase-admin/firestore";
import { CreateBusinessInterface } from "../../Interfaces/businessinterface";
import BusinessInformationBreakDown from "../../Utils/DTOS/BusinessDTO";

class BusinessInitialization {
  private readonly database;
  private readonly businessRef;
  constructor() {
    this.database = getFirestore();
    this.businessRef = this.database.collection("businesses");
  }
  async getBusinessProfile(
    business_uid: string
  ): Promise<CreateBusinessInterface | null> {
    try {
      const queryBusinessName = await this.businessRef
        .where("uid", "==", business_uid)
        .get();
      if (queryBusinessName.empty) {
        return null;
      }
      let businessProfile: CreateBusinessInterface;
      queryBusinessName.forEach((doc: any) => {
        businessProfile = doc.data();
      });

      return BusinessInformationBreakDown(businessProfile);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getBusinessID(business_uid: string): Promise<string | null> {
    try {
      const queryBusinessName = await this.businessRef
        .where("uid", "==", business_uid)
        .get();
      if (queryBusinessName.empty) {
        return null;
      }
      let uid;
      queryBusinessName.forEach((doc: QueryDocumentSnapshot) => {
        uid = doc.id;
      });
      return uid;
    } catch (error: any) {
      throw new Error(error);
    }
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
  async registerBusiness(business: CreateBusinessInterface): Promise<string> {
    try {
      const businessExist = await this.doesBusinessExist(
        business.business_name
      );
      if (businessExist) {
        return "Business name already exist";
      }

      await this.businessRef.doc().set({
        ...business,
      });
      return "Business added";
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
export default BusinessInitialization;
