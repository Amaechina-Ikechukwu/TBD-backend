import { getFirestore } from "firebase-admin/firestore";
import { BusinessInterface } from "../../Interfaces/businessinterface";

class BusinessRegistration {
  private readonly database;
  constructor() {
    this.database = getFirestore();
  }

  async registerBusiness(business: BusinessInterface) {}
}
export default BusinessRegistration;
